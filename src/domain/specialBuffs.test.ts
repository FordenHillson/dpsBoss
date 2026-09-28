import { describe, expect, it } from 'vitest'
import {
  divineEchoFinalDmgBonus,
  divineEchoStatLabel,
  specialStatDeltas,
} from './specialBuffs'

describe('divineEchoFinalDmgBonus', () => {
  it('is 10% at low ATK', () => {
    expect(divineEchoFinalDmgBonus(0)).toBe(10)
    expect(divineEchoFinalDmgBonus(2999)).toBe(10)
  })

  it('gains 1% per 3000 flat ATK', () => {
    expect(divineEchoFinalDmgBonus(3000)).toBe(11)
    expect(divineEchoFinalDmgBonus(9000)).toBe(13)
    expect(divineEchoFinalDmgBonus(57823)).toBe(10 + 19)
  })

  it('caps scaled bonus at +20% (total 30%)', () => {
    expect(divineEchoFinalDmgBonus(60_000)).toBe(30)
    expect(divineEchoFinalDmgBonus(999_999)).toBe(30)
  })
})

describe('specialStatDeltas', () => {
  it('returns zeros when Divine Echo off', () => {
    expect(specialStatDeltas({ divineEcho: false }, 50_000)).toEqual({
      dmgPercent: 0,
      finalDmgPercent: 0,
    })
  })

  it('applies Additional DMG 90% and scaled Final DMG', () => {
    expect(specialStatDeltas({ divineEcho: true }, 30_000)).toEqual({
      dmgPercent: 90,
      finalDmgPercent: 20,
    })
  })

  it('builds a readable chip label', () => {
    expect(divineEchoStatLabel(30_000)).toBe('Add+90 · FD+20')
  })
})
