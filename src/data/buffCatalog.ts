/** Display catalog entry loaded from /buffs/*.json */
export interface BuffCatalogItem {
  id: string
  name: string
  /** Badge number; 0 hides badge */
  stat: number
  /** Public URL under repo, e.g. /buffs/icons/candyBasket.png */
  icon: string
}

let foodCache: BuffCatalogItem[] | null = null
let partyCache: BuffCatalogItem[] | null = null
let foodPromise: Promise<BuffCatalogItem[]> | null = null
let partyPromise: Promise<BuffCatalogItem[]> | null = null

async function fetchCatalog(url: string): Promise<BuffCatalogItem[]> {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`โหลด buff catalog ไม่สำเร็จ: ${url}`)
  }
  const data: unknown = await res.json()
  if (!Array.isArray(data)) return []
  return data.filter(
    (row): row is BuffCatalogItem =>
      !!row &&
      typeof row === 'object' &&
      typeof (row as BuffCatalogItem).id === 'string' &&
      typeof (row as BuffCatalogItem).name === 'string' &&
      typeof (row as BuffCatalogItem).icon === 'string' &&
      typeof (row as BuffCatalogItem).stat === 'number',
  )
}

export function loadFoodBuffCatalog(): Promise<BuffCatalogItem[]> {
  if (foodCache) return Promise.resolve(foodCache)
  if (!foodPromise) {
    foodPromise = fetchCatalog('/buffs/food.json')
      .then((items) => {
        foodCache = items
        return items
      })
      .catch((err) => {
        foodPromise = null
        throw err
      })
  }
  return foodPromise
}

export function loadPartyBuffCatalog(): Promise<BuffCatalogItem[]> {
  if (partyCache) return Promise.resolve(partyCache)
  if (!partyPromise) {
    partyPromise = fetchCatalog('/buffs/party.json')
      .then((items) => {
        partyCache = items
        return items
      })
      .catch((err) => {
        partyPromise = null
        throw err
      })
  }
  return partyPromise
}

export function catalogById(
  items: BuffCatalogItem[],
): Map<string, BuffCatalogItem> {
  return new Map(items.map((item) => [item.id, item]))
}
