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
  /** Sheet: Node IED (1=yes) — multiplicative +15% IED */
  nodeIed: boolean
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
  nodeIed: false,
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
  | 'nodeIed'
  | 'defenseSmash4'

export interface FoodCardDef {
  id: string
  label: string
  abbr: string
  kind: 'bossAtkFood' | 'physMaAtkFood' | ToggleFoodId
  /** For percent picks only */
  percent?: 30 | 50
}

/** Card definitions for UI (icons filled in later via abbr placeholder). */
export const FOOD_CARDS: FoodCardDef[] = [
  { id: 'bossAtk30', label: 'Boss Atk food 30%', abbr: 'BA30', kind: 'bossAtkFood', percent: 30 },
  { id: 'bossAtk50', label: 'Boss Atk food 50%', abbr: 'BA50', kind: 'bossAtkFood', percent: 50 },
  { id: 'physAtk30', label: 'Phys/MA Atk food 30%', abbr: 'PA30', kind: 'physMaAtkFood', percent: 30 },
  { id: 'physAtk50', label: 'Phys/MA Atk food 50%', abbr: 'PA50', kind: 'physMaAtkFood', percent: 50 },
  { id: 'candyBasket', label: 'Candy Basket / Cane', abbr: 'Candy', kind: 'candyBasket' },
  { id: 'chestnut', label: 'Chestnut', abbr: 'Chest', kind: 'chestnut' },
  { id: 'carrotJuice', label: 'Carrot Juice', abbr: 'Carrot', kind: 'carrotJuice' },
  { id: 'noodleSoup', label: 'Noodle Soup', abbr: 'Noodle', kind: 'noodleSoup' },
  { id: 'jellyfish', label: 'Jellyfish', abbr: 'Jelly', kind: 'jellyfish' },
  { id: 'porkSnail', label: 'Pork / Snail', abbr: 'Pork', kind: 'porkSnail' },
  { id: 'bossRush', label: 'Boss Rush', abbr: 'Rush', kind: 'bossRush' },
  { id: 'fever', label: 'Fever (maxed)', abbr: 'Fever', kind: 'fever' },
  {
    id: 'nodeIed',
    label: 'Node IED (skill node Lv.40+)',
    abbr: 'Node',
    kind: 'nodeIed',
  },
  {
    id: 'defenseSmash4',
    label: 'Node Defense Smash 4',
    abbr: 'DS4',
    kind: 'defenseSmash4',
  },
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
  if (food.nodeIed) extras.push(0.15)
  if (food.defenseSmash4) extras.push(0.25)
  return extras
}
