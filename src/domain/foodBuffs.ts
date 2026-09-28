/** Exclusive pick for Boss Atk / Phys Atk food: 0 | 30 | 50 (human-readable %). */
export type FoodPercentPick = 0 | 30 | 50

export interface FoodBuffSelection {
  bossAtkFood: FoodPercentPick
  physMaAtkFood: FoodPercentPick
  candyBasket: boolean
  chestnut: boolean
  carrotJuice: boolean
  noodleSoup: boolean
  jellyfish: boolean
  porkSnail: boolean
  bossRush: boolean
  fever: boolean
  /** Sheet: DS4 Active — multiplicative +25% IED */
  defenseSmash4: boolean
}

export const DEFAULT_FOOD_BUFFS: FoodBuffSelection = {
  bossAtkFood: 0,
  physMaAtkFood: 0,
  candyBasket: false,
  chestnut: false,
  carrotJuice: false,
  noodleSoup: false,
  jellyfish: false,
  porkSnail: false,
  bossRush: false,
  fever: false,
  defenseSmash4: false,
}

export type ToggleFoodId =
  | 'candyBasket'
  | 'chestnut'
  | 'carrotJuice'
  | 'noodleSoup'
  | 'jellyfish'
  | 'porkSnail'
  | 'bossRush'
  | 'fever'
  | 'defenseSmash4'

export type FoodBuffGroup =
  | 'PHY / MAG ATK'
  | 'PHY / MAG DMG'
  | 'Boss Atk'
  | 'Crit Rate'
  | 'Crit Dmg'
  | 'Fever'
  | 'IED'

export interface FoodCardDef {
  id: string
  label: string
  abbr: string
  kind: 'bossAtkFood' | 'physMaAtkFood' | ToggleFoodId
  group: FoodBuffGroup
  /** Display chip, e.g. "+30%" */
  statLabel: string
  /** For percent picks only */
  percent?: 30 | 50
}

/** Card definitions for UI (icons filled in later via abbr placeholder). */
export const FOOD_CARDS: FoodCardDef[] = [
  {
    id: 'physAtk30',
    label: 'Phys/MA Atk food 30%',
    abbr: 'PA30',
    kind: 'physMaAtkFood',
    group: 'PHY / MAG ATK',
    statLabel: '+30%',
    percent: 30,
  },
  {
    id: 'physAtk50',
    label: 'Phys/MA Atk food 50%',
    abbr: 'PA50',
    kind: 'physMaAtkFood',
    group: 'PHY / MAG ATK',
    statLabel: '+50%',
    percent: 50,
  },
  {
    id: 'candyBasket',
    label: 'Candy Basket / Cane',
    abbr: 'Candy',
    kind: 'candyBasket',
    group: 'PHY / MAG DMG',
    statLabel: '+30%',
  },
  {
    id: 'porkSnail',
    label: 'Pork / Snail',
    abbr: 'Pork',
    kind: 'porkSnail',
    group: 'PHY / MAG DMG',
    statLabel: '+20%',
  },
  {
    id: 'bossAtk30',
    label: 'Boss Atk food 30%',
    abbr: 'BA30',
    kind: 'bossAtkFood',
    group: 'Boss Atk',
    statLabel: '+30%',
    percent: 30,
  },
  {
    id: 'bossAtk50',
    label: 'Boss Atk food 50%',
    abbr: 'BA50',
    kind: 'bossAtkFood',
    group: 'Boss Atk',
    statLabel: '+50%',
    percent: 50,
  },
  {
    id: 'jellyfish',
    label: 'Jellyfish',
    abbr: 'Jelly',
    kind: 'jellyfish',
    group: 'Boss Atk',
    statLabel: '+20%',
  },
  {
    id: 'bossRush',
    label: 'Boss Rush',
    abbr: 'Rush',
    kind: 'bossRush',
    group: 'Boss Atk',
    statLabel: '+50%',
  },
  {
    id: 'carrotJuice',
    label: 'Carrot Juice',
    abbr: 'Carrot',
    kind: 'carrotJuice',
    group: 'Crit Rate',
    statLabel: '+30%',
  },
  {
    id: 'noodleSoup',
    label: 'Noodle Soup',
    abbr: 'Noodle',
    kind: 'noodleSoup',
    group: 'Crit Rate',
    statLabel: '+20%',
  },
  {
    id: 'chestnut',
    label: 'Chestnut',
    abbr: 'Chest',
    kind: 'chestnut',
    group: 'Crit Dmg',
    statLabel: '+30%',
  },
  {
    id: 'fever',
    label: 'Fever (maxed)',
    abbr: 'Fever',
    kind: 'fever',
    group: 'Fever',
    statLabel: 'ATK+10 · CR+10 · CD+20',
  },
  {
    id: 'defenseSmash4',
    label: 'Node Defense Smash 4',
    abbr: 'DS4',
    kind: 'defenseSmash4',
    group: 'IED',
    statLabel: '+25%',
  },
]

export const FOOD_BUFF_GROUP_ORDER: FoodBuffGroup[] = [
  'PHY / MAG ATK',
  'PHY / MAG DMG',
  'Boss Atk',
  'Crit Rate',
  'Crit Dmg',
  'Fever',
  'IED',
]

export function isFoodCardChecked(
  selection: FoodBuffSelection,
  card: FoodCardDef,
): boolean {
  if (card.kind === 'bossAtkFood' || card.kind === 'physMaAtkFood') {
    return selection[card.kind] === card.percent
  }
  return selection[card.kind]
}

export function toggleFoodCard(
  selection: FoodBuffSelection,
  card: FoodCardDef,
): FoodBuffSelection {
  if (card.kind === 'bossAtkFood' || card.kind === 'physMaAtkFood') {
    const percent = card.percent!
    const current = selection[card.kind]
    return {
      ...selection,
      [card.kind]: current === percent ? 0 : percent,
    }
  }
  return {
    ...selection,
    [card.kind]: !selection[card.kind],
  }
}

/** Additive human-readable % deltas from food selection (sheet K column effects). */
export function foodStatDeltas(food: FoodBuffSelection): {
  atkPercent: number
  dmgPercent: number
  bossPercent: number
  critRatePercent: number
  critDmgPercent: number
} {
  return {
    atkPercent: food.physMaAtkFood + (food.fever ? 10 : 0),
    dmgPercent:
      (food.candyBasket ? 30 : 0) + (food.porkSnail ? 20 : 0),
    bossPercent:
      food.bossAtkFood +
      (food.jellyfish ? 20 : 0) +
      (food.bossRush ? 50 : 0),
    critRatePercent:
      (food.carrotJuice ? 30 : 0) +
      (food.noodleSoup ? 20 : 0) +
      (food.fever ? 10 : 0),
    critDmgPercent:
      (food.chestnut ? 30 : 0) + (food.fever ? 20 : 0),
  }
}

/**
 * Stack IED multiplicatively like the sheet Total DIR:
 * 1 - (1 - base) * Π(1 - extra)
 * Returns human-readable percent.
 */
export function stackIedPercent(
  baseIedPercent: number,
  extraFractions: number[],
): number {
  let remain = 1 - baseIedPercent / 100
  for (const fraction of extraFractions) {
    remain *= 1 - fraction
  }
  return (1 - remain) * 100
}

/** Extra IED fractions from node/skill buff cards (not additive food %). */
export function foodIedExtras(food: FoodBuffSelection): number[] {
  const extras: number[] = []
  if (food.defenseSmash4) extras.push(0.25)
  return extras
}
