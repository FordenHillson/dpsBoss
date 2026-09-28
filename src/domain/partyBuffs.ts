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

export type PartyBuffGroup =
  | 'PHY / MAG ATK'
  | 'PHY / MAG DMG'
  | 'Boss'
  | 'Crit Dmg'

export interface PartyCardDef {
  id: PartyBuffId
  label: string
  abbr: string
  group: PartyBuffGroup
  /** Display chip, e.g. "+35%" */
  statLabel: string
}

/** Sheet column F/H party buffs (0/1 toggles). */
export const PARTY_CARDS: PartyCardDef[] = [
  {
    id: 'advanceBlessing',
    label: 'Advanced Blessing',
    abbr: 'AB',
    group: 'PHY / MAG ATK',
    statLabel: 'ATK+35 · Boss+15',
  },
  {
    id: 'unmanagedAnger',
    label: 'Unmanaged Anger (Hero)',
    abbr: 'UA',
    group: 'PHY / MAG ATK',
    statLabel: '+21%',
  },
  {
    id: 'callOfTheWild',
    label: 'Call of the Wild',
    abbr: 'CotW',
    group: 'PHY / MAG ATK',
    statLabel: '+15%',
  },
  {
    id: 'combatOrders',
    label: 'Combat Orders',
    abbr: 'CO',
    group: 'PHY / MAG DMG',
    statLabel: '+15%',
  },
  {
    id: 'evanBuff',
    label: 'Evan buff',
    abbr: 'Evan',
    group: 'PHY / MAG DMG',
    statLabel: '+15%',
  },
  {
    id: 'speedInfusion',
    label: 'Speed Infusion',
    abbr: 'SI',
    group: 'Boss',
    statLabel: '+9.6%',
  },
  {
    id: 'lv200Buff',
    label: 'Lv 200 buff',
    abbr: 'Lv200',
    group: 'Crit Dmg',
    statLabel: '+30%',
  },
]

export const PARTY_BUFF_GROUP_ORDER: PartyBuffGroup[] = [
  'PHY / MAG ATK',
  'PHY / MAG DMG',
  'Boss',
  'Crit Dmg',
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
