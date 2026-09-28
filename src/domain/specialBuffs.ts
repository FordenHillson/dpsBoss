/** Divine Echo (Bishop) — special buff, not a party toggle list item. */

export const DIVINE_ECHO_ADDITIONAL_DMG = 90
export const DIVINE_ECHO_FD_BASE = 10
/** +1% Final DMG per this much flat Phys Atk (unaffected by Atk %). */
export const DIVINE_ECHO_FD_ATK_STEP = 3000
export const DIVINE_ECHO_FD_SCALE_CAP = 20

export interface SpecialBuffSelection {
  /** Divine Echo Lv.30 — Additional DMG + Final DMG (scaled by flat ATK). */
  divineEcho: boolean
}

export const DEFAULT_SPECIAL_BUFFS: SpecialBuffSelection = {
  divineEcho: false,
}

/**
 * Final DMG % from Divine Echo:
 * 10% + min(floor(flatAtk / 3000), 20)%
 */
export function divineEchoFinalDmgBonus(flatAtk: number): number {
  const scaled = Math.min(
    DIVINE_ECHO_FD_SCALE_CAP,
    Math.floor(Math.max(0, flatAtk) / DIVINE_ECHO_FD_ATK_STEP),
  )
  return DIVINE_ECHO_FD_BASE + scaled
}

export function divineEchoStatLabel(flatAtk: number): string {
  const fd = divineEchoFinalDmgBonus(flatAtk)
  return `Add+${DIVINE_ECHO_ADDITIONAL_DMG} · FD+${fd}`
}

export function specialStatDeltas(
  special: SpecialBuffSelection,
  flatAtk: number,
): { dmgPercent: number; finalDmgPercent: number } {
  if (!special.divineEcho) {
    return { dmgPercent: 0, finalDmgPercent: 0 }
  }
  return {
    /** Maps Additional DMG into the line's DMG% bucket for boss-line estimate. */
    dmgPercent: DIVINE_ECHO_ADDITIONAL_DMG,
    finalDmgPercent: divineEchoFinalDmgBonus(flatAtk),
  }
}

export function toggleDivineEcho(
  selection: SpecialBuffSelection,
): SpecialBuffSelection {
  return { ...selection, divineEcho: !selection.divineEcho }
}
