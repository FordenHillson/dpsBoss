/** Divine Echo (Paladin) — special buff, not a party toggle list item. */

export const DIVINE_ECHO_ADDITIONAL_DMG = 90
export const DIVINE_ECHO_FD_BASE = 10
/** +1% Final DMG per this much flat Phys Atk (unaffected by Atk %). */
export const DIVINE_ECHO_FD_ATK_STEP = 3000
export const DIVINE_ECHO_FD_SCALE_CAP = 20

export interface SpecialBuffSelection {
  /** Divine Echo Lv.30 — Additional DMG + Final DMG (scaled by caster flat ATK). */
  divineEcho: boolean
  /**
   * Flat PHY ATK of the Paladin who cast Echo (Character Stats),
   * not the damage dealer's ATK and not Atk %.
   */
  paladinFlatAtk: number
}

export const DEFAULT_SPECIAL_BUFFS: SpecialBuffSelection = {
  divineEcho: false,
  paladinFlatAtk: 0,
}

/**
 * Final DMG % from Divine Echo:
 * 10% + min(floor(paladinFlatAtk / 3000), 20)%
 */
export function divineEchoFinalDmgBonus(paladinFlatAtk: number): number {
  const scaled = Math.min(
    DIVINE_ECHO_FD_SCALE_CAP,
    Math.floor(Math.max(0, paladinFlatAtk) / DIVINE_ECHO_FD_ATK_STEP),
  )
  return DIVINE_ECHO_FD_BASE + scaled
}

export function divineEchoStatLabel(paladinFlatAtk: number): string {
  const fd = divineEchoFinalDmgBonus(paladinFlatAtk)
  return `Add+${DIVINE_ECHO_ADDITIONAL_DMG} · FD+${fd}`
}

export function specialStatDeltas(
  special: SpecialBuffSelection,
): { dmgPercent: number; finalDmgPercent: number } {
  if (!special.divineEcho) {
    return { dmgPercent: 0, finalDmgPercent: 0 }
  }
  return {
    /** Maps Additional DMG into the line's DMG% bucket for boss-line estimate. */
    dmgPercent: DIVINE_ECHO_ADDITIONAL_DMG,
    finalDmgPercent: divineEchoFinalDmgBonus(special.paladinFlatAtk),
  }
}

export function toggleDivineEcho(
  selection: SpecialBuffSelection,
): SpecialBuffSelection {
  return { ...selection, divineEcho: !selection.divineEcho }
}

export function setPaladinFlatAtk(
  selection: SpecialBuffSelection,
  paladinFlatAtk: number,
): SpecialBuffSelection {
  const n = Number.isFinite(paladinFlatAtk) ? Math.max(0, paladinFlatAtk) : 0
  return { ...selection, paladinFlatAtk: n }
}
