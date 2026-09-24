import { describe, expect, it } from 'vitest'
import { calculateBossDamage, nonCritBossLine } from './bossDamage'
import { computeIedMultiplier } from './iedModifier'
import { computeLevelModifier } from './levelModifier'
import { normalizeStats, p } from './normalizeStats'
import type { CalculatorInput } from './types'

const sample: CalculatorInput = {
  level: 262,
  atk: 73562,
  atkPercent: 258.0,
  dmgPercent: 191.3,
  bossPercent: 253.38,
  critRatePercent: 189.5,
  critDmgPercent: 533.22,
  finalDmgPercent: 93.0,
  iedPercent: 64.81,
  maxDmg: 203027499,
  skillPercent: 500,
  monsterLevel: 1,
  bossPdrPercent: 20,
}

describe('normalizeStats', () => {
  it('converts human percents and caps crit rate at 100%', () => {
    const n = normalizeStats(sample)
    expect(n.atkFraction).toBeCloseTo(2.58, 6)
    expect(n.skillMultiplier).toBeCloseTo(5, 6)
    expect(n.critRateFraction).toBe(1)
    expect(p(50)).toBeCloseTo(0.5, 10)
  })
})

describe('levelModifier', () => {
  it('matches data-mined sheet for lv 262 vs 1', () => {
    const mod = computeLevelModifier(262, 1)
    expect(mod).toBeCloseTo(0.996118604, 5)
  })
})

describe('iedMultiplier', () => {
  it('uses 1 - PDR * (1 - DIR)', () => {
    expect(computeIedMultiplier(0.2, 0.6481)).toBeCloseTo(1 - 0.2 * (1 - 0.6481), 10)
  })
})

describe('bossDamage', () => {
  it('matches sheet raw non-crit and crit mid', () => {
    const n = normalizeStats(sample)
    expect(nonCritBossLine(n)).toBeCloseTo(33600672.14, 0)
    const result = calculateBossDamage(sample)
    expect(result.raw.crit.mid).toBeCloseTo(221166344.1, -1)
  })

  it('applies level then IED; capped mid follows cap-then-IED', () => {
    const result = calculateBossDamage(sample)
    expect(result.levelModifier).toBeCloseTo(0.996118604, 5)
    expect(result.afterLevel.crit.mid).toBeCloseTo(220307910, -1)
    expect(result.afterLevel.cappedMid).toBe(203027499)
    expect(result.afterIed.nonCrit).toBeCloseTo(31114618, -1)
    expect(result.afterIed.crit.mid).toBeCloseTo(204802639, -1)
    expect(result.afterIed.cappedMid).toBeCloseTo(188738424, -1)
  })
})
