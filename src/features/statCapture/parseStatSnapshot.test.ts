import { describe, expect, it } from 'vitest'
import { applySnapshot, parseStatSnapshot } from './parseStatSnapshot'
import type { CalculatorInput } from '../../domain/types'

describe('parseStatSnapshot', () => {
  it('parses plain JSON and reports missing keys', () => {
    const result = parseStatSnapshot(
      JSON.stringify({
        level: 262,
        atk: 73562,
        atkPercent: 258,
        dmgPercent: 191.3,
        bossPercent: 253.4,
        critRatePercent: 189.5,
        critDmgPercent: 533.2,
        finalDmgPercent: 93,
        iedPercent: 45,
      }),
    )
    expect(result.data.atk).toBe(73562)
    expect(result.missing).toContain('maxDmg')
    expect(result.ok).toBe(false)
  })

  it('accepts fenced JSON and comma numbers', () => {
    const result = parseStatSnapshot(`\`\`\`json
{"level":1,"atk":"73,562","atkPercent":258,"dmgPercent":191.3,"bossPercent":253.4,"critRatePercent":189.5,"critDmgPercent":533.2,"finalDmgPercent":93,"iedPercent":45,"maxDmg":"203,027,499"}
\`\`\``)
    expect(result.ok).toBe(true)
    expect(result.data.maxDmg).toBe(203027499)
    expect(result.data.atk).toBe(73562)
  })

  it('applySnapshot does not clear unspecified captured fields when partial', () => {
    const current: CalculatorInput = {
      level: 200,
      atk: 1,
      atkPercent: 1,
      dmgPercent: 1,
      bossPercent: 1,
      critRatePercent: 1,
      critDmgPercent: 1,
      finalDmgPercent: 1,
      iedPercent: 1,
      maxDmg: 1,
      skillPercent: 500,
      monsterLevel: 250,
      bossPdrPercent: 300,
      critResPercent: 0,
      skillPhyMagDmg10: false,
      skillIed15: false,
    }
    const next = applySnapshot(current, { atk: 999 })
    expect(next.atk).toBe(999)
    expect(next.skillPercent).toBe(500)
    expect(next.monsterLevel).toBe(250)
    expect(next.level).toBe(200)
  })
})
