import type { CalculatorInput } from '../../domain/types'

export const DEFAULT_INPUT: CalculatorInput = {
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
  monsterLevel: 250,
  bossPdrPercent: 300,
  critResPercent: 0,
  skillPhyMagDmg10: false,
  skillIed15: false,
}

export function formatDamage(n: number): string {
  return Math.round(n).toLocaleString('en-US')
}

export function formatPercentFraction(fraction: number): string {
  return `${(fraction * 100).toFixed(2)}%`
}
