import { describe, expect, it } from 'vitest'
import { calculateBossDamage } from './bossDamage'
import {
  computeBuffedStats,
  toBuffedCalculatorInput,
} from './buffedStats'
import { DEFAULT_FOOD_BUFFS } from './foodBuffs'
import { DEFAULT_HYPER_SKILL } from './hyperSkill'
import { DEFAULT_PARTY_BUFFS } from './partyBuffs'
import type { CalculatorInput } from './types'

/**
 * Snapshot from Google Sheet Damage Calculator
 * (Node IED=1, DS4=1, no food/party/hyper).
 * B18 DIR 44.8%, B14 PDR 50%, B11/B12 lv 258/200.
 */
const sheetSampleBase: CalculatorInput = {
  level: 258,
  atk: 57823,
  atkPercent: 290.1,
  dmgPercent: 184.26,
  bossPercent: 165.28,
  critRatePercent: 189.5,
  critDmgPercent: 424.6,
  finalDmgPercent: 90,
  iedPercent: 44.8,
  maxDmg: 115101599,
  skillPercent: 256,
  monsterLevel: 200,
  bossPdrPercent: 50,
}

describe('sheet parity (Damage Calculator sample)', () => {
  const food = {
    ...DEFAULT_FOOD_BUFFS,
    nodeIed: true,
    defenseSmash4: true,
  }
  const buffed = computeBuffedStats(
    sheetSampleBase,
    food,
    DEFAULT_HYPER_SKILL,
    DEFAULT_PARTY_BUFFS,
  )
  const result = calculateBossDamage(
    toBuffedCalculatorInput(sheetSampleBase, buffed),
  )

  it('Total DIR matches B16 with Node 15% + DS4 25%', () => {
    expect(buffed.iedPercent).toBeCloseTo(64.81, 5)
  })

  it('Level modifier matches data-mined B13', () => {
    expect(result.levelModifier).toBeCloseTo(0.6877211241, 8)
  })

  it('raw / afterLevel / afterIed match L35–L46', () => {
    expect(result.raw.nonCrit).toBeCloseTo(6501540.619, 0)
    expect(result.raw.crit.mid).toBeCloseTo(35732467.24, 0)
    expect(result.afterLevel.nonCrit).toBeCloseTo(4471246.823, 0)
    expect(result.afterLevel.crit.mid).toBeCloseTo(24573972.54, 0)
    expect(result.afterIed.nonCrit).toBeCloseTo(3684530.944, 0)
    expect(result.afterIed.crit.mid).toBeCloseTo(20250182.07, 0)
    expect(result.afterIed.cappedMid).toBeCloseTo(20250182.07, 0)
  })

  it('IED multiplier is 1 - PDR*(1-DIR)', () => {
    expect(result.iedMultiplier).toBeCloseTo(1 - 0.5 * (1 - 0.6481), 5)
  })
})
