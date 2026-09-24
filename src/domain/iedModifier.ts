/** Multiplier after Boss PDR and character DIR/IED: 1 - PDR × (1 - DIR) */
export function computeIedMultiplier(
  bossPdrFraction: number,
  iedFraction: number,
): number {
  return 1 - bossPdrFraction * (1 - iedFraction)
}
