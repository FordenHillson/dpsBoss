import type { CalculatorInput, NormalizedStats } from './types'

/** Convert human-readable percent (253.4) to fraction (2.534). */
export function p(percent: number): number {
  return percent / 100
}

export function normalizeStats(input: CalculatorInput): NormalizedStats {
  return {
    level: input.level,
    monsterLevel: input.monsterLevel,
    atk: input.atk,
    atkFraction: p(input.atkPercent),
    dmgFraction: p(input.dmgPercent),
    bossFraction: p(input.bossPercent),
    critRateFraction: Math.min(1, p(input.critRatePercent)),
    critDmgFraction: p(input.critDmgPercent),
    finalDmgFraction: p(input.finalDmgPercent),
    iedFraction: p(input.iedPercent),
    skillMultiplier: p(input.skillPercent),
    bossPdrFraction: p(input.bossPdrPercent),
    maxDmg: input.maxDmg,
  }
}
