import { computeIedMultiplier } from './iedModifier'
import { computeLevelModifier } from './levelModifier'
import { normalizeStats } from './normalizeStats'
import type {
  BossDamageResult,
  BossLineStage,
  CalculatorInput,
  CritBand,
  NormalizedStats,
} from './types'

function critBand(nonCrit: number, critDmgFraction: number): CritBand {
  return {
    low: nonCrit * (1 + critDmgFraction),
    mid: nonCrit * (1 + 0.25 + critDmgFraction),
    high: nonCrit * (1 + 0.5 + critDmgFraction),
  }
}

function stageRaw(
  nonCrit: number,
  critDmgFraction: number,
  maxDmg: number,
): BossLineStage {
  const crit = critBand(nonCrit, critDmgFraction)
  return {
    nonCrit,
    crit,
    cappedMid: Math.min(crit.mid, maxDmg),
    cappedLow: Math.min(crit.low, maxDmg),
    cappedHigh: Math.min(crit.high, maxDmg),
  }
}

/** After IED: scale lines; capped mid follows sheet L46 (cap-then-IED). */
function stageAfterIed(
  afterLevel: BossLineStage,
  iedMultiplier: number,
  critDmgFraction: number,
  maxDmg: number,
): BossLineStage {
  const nonCrit = afterLevel.nonCrit * iedMultiplier
  const crit = critBand(nonCrit, critDmgFraction)
  return {
    nonCrit,
    crit,
    cappedMid: afterLevel.cappedMid * iedMultiplier,
    cappedLow: Math.min(crit.low, maxDmg),
    cappedHigh: Math.min(crit.high, maxDmg),
  }
}

/** Non-Crit Boss raw line (sheet L35). */
export function nonCritBossLine(s: NormalizedStats): number {
  return (
    s.atk *
    (1 + s.dmgFraction) *
    (1 + s.atkFraction + s.skillMultiplier * s.bossFraction) *
    s.skillMultiplier *
    (1 + s.finalDmgFraction)
  )
}

export function calculateBossDamage(input: CalculatorInput): BossDamageResult {
  const s = normalizeStats(input)
  const raw = stageRaw(nonCritBossLine(s), s.critDmgFraction, s.maxDmg)

  const levelModifier = computeLevelModifier(s.level, s.monsterLevel)
  const afterLevel = stageRaw(
    raw.nonCrit * levelModifier,
    s.critDmgFraction,
    s.maxDmg,
  )

  const iedMultiplier = computeIedMultiplier(s.bossPdrFraction, s.iedFraction)
  const afterIed = stageAfterIed(
    afterLevel,
    iedMultiplier,
    s.critDmgFraction,
    s.maxDmg,
  )

  return {
    levelModifier,
    iedMultiplier,
    raw,
    afterLevel,
    afterIed,
  }
}
