import { getDefenseRating } from '../data/defenseRating'

/**
 * Level modifier = remaining damage fraction after Defense Rating reduction.
 * DamageReduction% = TargetDR / (YourDR + TargetDR)
 * Modifier = 1 - reduction
 */
export function computeLevelModifier(
  playerLevel: number,
  targetLevel: number,
): number {
  const yourDr = getDefenseRating(playerLevel)
  const targetDr = getDefenseRating(targetLevel)
  if (yourDr === undefined || targetDr === undefined) {
    throw new Error(
      `Defense Rating ไม่พบสำหรับเลเวลผู้เล่น ${playerLevel} หรือเป้าหมาย ${targetLevel}`,
    )
  }
  const total = yourDr + targetDr
  if (total <= 0) return 1
  return 1 - targetDr / total
}
