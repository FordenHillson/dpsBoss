import { useEffect, useState } from 'react'
import {
  catalogById,
  loadFoodBuffCatalog,
  loadPartyBuffCatalog,
  type BuffCatalogItem,
} from '../../data/buffCatalog'

export function useFoodBuffCatalog(): {
  byId: Map<string, BuffCatalogItem>
  ready: boolean
} {
  const [items, setItems] = useState<BuffCatalogItem[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let alive = true
    loadFoodBuffCatalog()
      .then((list) => {
        if (!alive) return
        setItems(list)
        setReady(true)
      })
      .catch(() => {
        if (!alive) return
        setReady(true)
      })
    return () => {
      alive = false
    }
  }, [])

  return { byId: catalogById(items), ready }
}

export function usePartyBuffCatalog(): {
  byId: Map<string, BuffCatalogItem>
  ready: boolean
} {
  const [items, setItems] = useState<BuffCatalogItem[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let alive = true
    loadPartyBuffCatalog()
      .then((list) => {
        if (!alive) return
        setItems(list)
        setReady(true)
      })
      .catch(() => {
        if (!alive) return
        setReady(true)
      })
    return () => {
      alive = false
    }
  }, [])

  return { byId: catalogById(items), ready }
}
