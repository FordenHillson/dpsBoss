import {
  afScStatDeltas,
  type AfScBonusCatalog,
  type AfScSelection,
} from './afScBonus'
import { computeLevelModifier } from './levelModifier'
import {
  foodIedExtras,
  foodStatDeltas,
  stackIedPercent,
  type FoodBuffSelection,
} from './foodBuffs'
import type { HyperSkill } from './hyperSkill'
import { partyStatDeltas, type PartyBuffSelection } from './partyBuffs'
import {
  specialStatDeltas,
  type SpecialBuffSelection,
} from './specialBuffs'
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
  maxDmg: number
  levelModifier: number
}

/**
 * Captured/Manual fields are base (exclude food, party, hyper, special, AF/SC).
 * Buffed = base + food + party + hyper + special + AF/SC.
 * Crit Res subtracts from Crit Rate (sheet N6 − B25).
 */
export function computeBuffedStats(
  base: CalculatorInput,
  food: FoodBuffSelection,
  hyper: HyperSkill,
  party: PartyBuffSelection,
  special: SpecialBuffSelection = { divineEcho: false },
  afScCatalog: AfScBonusCatalog | null = null,
  afSc: AfScSelection = { baseKey: '', tierId: '' },
): BuffedStats {
  const foodD = foodStatDeltas(food)
  const partyD = partyStatDeltas(party)
  const specialD = specialStatDeltas(special, base.atk)
  const afScD = afScStatDeltas(afScCatalog, afSc)
  const iedExtras = [
    ...foodIedExtras(food),
    ...(base.skillIed15 ? [0.15] : []),
  ]
  const critRatePercent =
    base.critRatePercent + foodD.critRatePercent - base.critResPercent
  return {
    atk: base.atk,
    atkPercent:
      base.atkPercent +
      foodD.atkPercent +
      partyD.atkPercent +
      hyper.paMaAtkPercent +
      afScD.atkPercent,
    dmgPercent:
      base.dmgPercent +
      foodD.dmgPercent +
      partyD.dmgPercent +
      specialD.dmgPercent +
      (base.skillPhyMagDmg10 ? 10 : 0),
    bossPercent:
      base.bossPercent +
      foodD.bossPercent +
      partyD.bossPercent +
      hyper.bossAtkPercent +
      afScD.bossPercent,
    critRatePercent,
    critRateMaxPercent: Math.min(100, Math.max(0, critRatePercent)),
    critDmgPercent:
      base.critDmgPercent +
      foodD.critDmgPercent +
      partyD.critDmgPercent +
      hyper.critDmgPercent +
      afScD.critDmgPercent,
    skillPercent: base.skillPercent,
    finalDmgPercent:
      base.finalDmgPercent +
      hyper.finalDmgPercent +
      specialD.finalDmgPercent,
    iedPercent: stackIedPercent(base.iedPercent, iedExtras),
    maxDmg: base.maxDmg + afScD.maxDmg,
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
    maxDmg: buffed.maxDmg,
  }
}
