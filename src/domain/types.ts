/** Human-readable percents as on the Character Stats UI (e.g. 253.4 = 253.4%). */
export interface CapturedStats {
  level: number
  atk: number
  atkPercent: number
  dmgPercent: number
  bossPercent: number
  critRatePercent: number
  critDmgPercent: number
  finalDmgPercent: number
  iedPercent: number
  maxDmg: number
}

export interface ManualStats {
  skillPercent: number
  monsterLevel: number
  bossPdrPercent: number
}

export type CalculatorInput = CapturedStats & ManualStats

/** Fractions used by the damage engine (0.5 = 50%). */
export interface NormalizedStats {
  level: number
  monsterLevel: number
  atk: number
  atkFraction: number
  dmgFraction: number
  bossFraction: number
  critRateFraction: number
  critDmgFraction: number
  finalDmgFraction: number
  iedFraction: number
  skillMultiplier: number
  bossPdrFraction: number
  maxDmg: number
}

export interface CritBand {
  low: number
  mid: number
  high: number
}

export interface BossLineStage {
  nonCrit: number
  crit: CritBand
  cappedMid: number
  cappedLow: number
  cappedHigh: number
}

export interface BossDamageResult {
  levelModifier: number
  iedMultiplier: number
  raw: BossLineStage
  afterLevel: BossLineStage
  afterIed: BossLineStage
}
