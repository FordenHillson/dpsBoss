import { describe, expect, it } from 'vitest'
import { computeBuffedStats, toBuffedCalculatorInput } from './buffedStats'
import { DEFAULT_FOOD_BUFFS, toggleFoodCard, FOOD_CARDS } from './foodBuffs'
import { DEFAULT_HYPER_SKILL } from './hyperSkill'
import { DEFAULT_PARTY_BUFFS } from './partyBuffs'
import type { CalculatorInput } from './types'

const base: CalculatorInput = {
  level: 262,
  atk: 73562,
  atkPercent: 258,
  dmgPercent: 191.3,
  bossPercent: 253.4,
  critRatePercent: 189.5,
  critDmgPercent: 533.2,
  finalDmgPercent: 93,
  iedPercent: 45,
  maxDmg: 203027499,
  skillPercent: 500,
  monsterLevel: 1,
  bossPdrPercent: 20,
}

describe('food exclusive picks', () => {
  it('Boss Atk 30/50 are mutually exclusive', () => {
    const c30 = FOOD_CARDS.find((c) => c.id === 'bossAtk30')!
    const c50 = FOOD_CARDS.find((c) => c.id === 'bossAtk50')!
    let s = toggleFoodCard(DEFAULT_FOOD_BUFFS, c30)
    expect(s.bossAtkFood).toBe(30)
    s = toggleFoodCard(s, c50)
    expect(s.bossAtkFood).toBe(50)
    s = toggleFoodCard(s, c50)
    expect(s.bossAtkFood).toBe(0)
  })
})

describe('computeBuffedStats', () => {
  it('adds food and hyper on top of base', () => {
    let food = { ...DEFAULT_FOOD_BUFFS, bossAtkFood: 50 as const, fever: true }
    food = { ...food, chestnut: true }
    const hyper = { ...DEFAULT_HYPER_SKILL, finalDmgPercent: 10 }
    const buffed = computeBuffedStats(
      base,
      food,
      hyper,
      DEFAULT_PARTY_BUFFS,
    )
    expect(buffed.bossPercent).toBeCloseTo(253.4 + 50, 5)
    expect(buffed.atkPercent).toBeCloseTo(258 + 10, 5)
    expect(buffed.critDmgPercent).toBeCloseTo(533.2 + 30 + 20, 5)
    expect(buffed.finalDmgPercent).toBeCloseTo(103, 5)
    expect(buffed.critRateMaxPercent).toBe(100)
    expect(buffed.levelModifier).toBeCloseTo(0.996118604, 5)
    expect(buffed.iedPercent).toBeCloseTo(45, 5)

    const forDmg = toBuffedCalculatorInput(base, buffed)
    expect(forDmg.iedPercent).toBeCloseTo(45, 5)
    expect(forDmg.bossPercent).toBe(buffed.bossPercent)
  })

  it('stacks DS4 as multiplicative +25% IED', () => {
    const food = { ...DEFAULT_FOOD_BUFFS, defenseSmash4: true }
    const buffed = computeBuffedStats(
      base,
      food,
      DEFAULT_HYPER_SKILL,
      DEFAULT_PARTY_BUFFS,
    )
    expect(buffed.iedPercent).toBeCloseTo(58.75, 5)
  })

  it('stacks Node IED as multiplicative +15% IED', () => {
    const food = { ...DEFAULT_FOOD_BUFFS, nodeIed: true }
    const buffed = computeBuffedStats(
      base,
      food,
      DEFAULT_HYPER_SKILL,
      DEFAULT_PARTY_BUFFS,
    )
    expect(buffed.iedPercent).toBeCloseTo(53.25, 5)
  })

  it('stacks Node IED then DS4 multiplicatively', () => {
    const food = {
      ...DEFAULT_FOOD_BUFFS,
      nodeIed: true,
      defenseSmash4: true,
    }
    const buffed = computeBuffedStats(
      base,
      food,
      DEFAULT_HYPER_SKILL,
      DEFAULT_PARTY_BUFFS,
    )
    expect(buffed.iedPercent).toBeCloseTo(64.9375, 5)
  })

  it('applies party buffs from sheet coefficients', () => {
    const party = {
      ...DEFAULT_PARTY_BUFFS,
      advanceBlessing: true,
      combatOrders: true,
      lv200Buff: true,
    }
    const buffed = computeBuffedStats(
      base,
      DEFAULT_FOOD_BUFFS,
      DEFAULT_HYPER_SKILL,
      party,
    )
    expect(buffed.atkPercent).toBeCloseTo(258 + 35, 5)
    expect(buffed.bossPercent).toBeCloseTo(253.4 + 15, 5)
    expect(buffed.dmgPercent).toBeCloseTo(191.3 + 15, 5)
    expect(buffed.critDmgPercent).toBeCloseTo(533.2 + 30, 5)
  })
})
