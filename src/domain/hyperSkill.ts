/** Hyper skill additives — human-readable percents (30 = 30%). */
export interface HyperSkill {
  paMaAtkPercent: number
  bossAtkPercent: number
  critDmgPercent: number
  finalDmgPercent: number
}

export const DEFAULT_HYPER_SKILL: HyperSkill = {
  paMaAtkPercent: 0,
  bossAtkPercent: 0,
  critDmgPercent: 0,
  finalDmgPercent: 0,
}
