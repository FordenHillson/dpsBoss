import { computeLevelModifier } from './levelModifier'
import {
  foodIedExtras,
  foodStatDeltas,
  stackIedPercent,
  type FoodBuffSelection,
} from './foodBuffs'
import type { HyperSkill } from './hyperSkill'
import { partyStatDeltas, type PartyBuffSelection } from './partyBuffs'
import type { CalculatorInput } from './types'

/** Read-only Buffed stats view (sheet column N / display). */
export interface BuffedStats {
  atk: number
  atkPercent: number
  dmgPercent: number
  bossPercent: number
  critRatePercent: number
  critRateMaxPercent: number
  critDmgPercent: number
  skillPercent: number
  finalDmgPercent: number
  iedPercent: number
  levelModifier: number
}

/**
 * Captured/Manual fields are base (exclude food, party & hyper).
 * Buffed = base + food + party + hyper.
 */
export function computeBuffedStats(
  base: CalculatorInput,
  food: FoodBuffSelection,
  hyper: HyperSkill,
  party: PartyBuffSelection,
): BuffedStats {
  const foodD = foodStatDeltas(food)
  const partyD = partyStatDeltas(party)
  const critRatePercent = base.critRatePercent + foodD.critRatePercent
  return {
    atk: base.atk,
    atkPercent:
      base.atkPercent +
      foodD.atkPercent +
      partyD.atkPercent +
      hyper.paMaAtkPercent,
    dmgPercent: base.dmgPercent + foodD.dmgPercent + partyD.dmgPercent,
    bossPercent:
      base.bossPercent +
      foodD.bossPercent +
      partyD.bossPercent +
      hyper.bossAtkPercent,
    critRatePercent,
    critRateMaxPercent: Math.min(100, critRatePercent),
    critDmgPercent:
      base.critDmgPercent +
      foodD.critDmgPercent +
      partyD.critDmgPercent +
      hyper.critDmgPercent,
    skillPercent: base.skillPercent,
    finalDmgPercent: base.finalDmgPercent + hyper.finalDmgPercent,
    iedPercent: stackIedPercent(base.iedPercent, foodIedExtras(food)),
    levelModifier: computeLevelModifier(base.level, base.monsterLevel),
  }
}

/** Merge buffed combat percents back into a full CalculatorInput for damage. */
export function toBuffedCalculatorInput(
  base: CalculatorInput,
  buffed: BuffedStats,
): CalculatorInput {
  return {
    ...base,
    atk: buffed.atk,
    atkPercent: buffed.atkPercent,
    dmgPercent: buffed.dmgPercent,
    bossPercent: buffed.bossPercent,
    critRatePercent: buffed.critRatePercent,
    critDmgPercent: buffed.critDmgPercent,
    finalDmgPercent: buffed.finalDmgPercent,
    skillPercent: buffed.skillPercent,
    iedPercent: buffed.iedPercent,
  }
}
