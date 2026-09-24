export interface PartyBuffSelection {
  advanceBlessing: boolean
  speedInfusion: boolean
  unmanagedAnger: boolean
  combatOrders: boolean
  callOfTheWild: boolean
  evanBuff: boolean
  lv200Buff: boolean
}

export const DEFAULT_PARTY_BUFFS: PartyBuffSelection = {
  advanceBlessing: false,
  speedInfusion: false,
  unmanagedAnger: false,
  combatOrders: false,
  callOfTheWild: false,
  evanBuff: false,
  lv200Buff: false,
}

export type PartyBuffId = keyof PartyBuffSelection

export interface PartyCardDef {
  id: PartyBuffId
  label: string
  abbr: string
}

/** Sheet column F/H party buffs (0/1 toggles). */
export const PARTY_CARDS: PartyCardDef[] = [
  { id: 'advanceBlessing', label: 'Advance Blessing', abbr: 'AB' },
  { id: 'speedInfusion', label: 'Speed Infusion', abbr: 'SI' },
  { id: 'unmanagedAnger', label: 'Unmanaged Anger', abbr: 'UA' },
  { id: 'combatOrders', label: 'Combat Orders', abbr: 'CO' },
  { id: 'callOfTheWild', label: 'Call of the Wild', abbr: 'CotW' },
  { id: 'evanBuff', label: 'Evan buff', abbr: 'Evan' },
  { id: 'lv200Buff', label: 'Lv 200 buff', abbr: 'Lv200' },
]

export function togglePartyCard(
  selection: PartyBuffSelection,
  id: PartyBuffId,
): PartyBuffSelection {
  return { ...selection, [id]: !selection[id] }
}

/** Additive human-readable % deltas from sheet N-column party terms. */
export function partyStatDeltas(party: PartyBuffSelection): {
  atkPercent: number
  dmgPercent: number
  bossPercent: number
  critDmgPercent: number
} {
  return {
    atkPercent:
      (party.advanceBlessing ? 35 : 0) +
      (party.unmanagedAnger ? 21 : 0) +
      (party.callOfTheWild ? 15 : 0),
    dmgPercent:
      (party.combatOrders ? 15 : 0) + (party.evanBuff ? 15 : 0),
    bossPercent:
      (party.advanceBlessing ? 15 : 0) +
      (party.speedInfusion ? 9.6 : 0),
    critDmgPercent: party.lv200Buff ? 30 : 0,
  }
}
