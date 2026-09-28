import { useEffect, useState } from 'react'
import { loadAfScBonusCatalog } from '../../data/afScBonusCatalog'
import type { AfScBonusCatalog } from '../../domain/afScBonus'

export function useAfScBonusCatalog(): {
  catalog: AfScBonusCatalog | null
  loading: boolean
  error: string | null
} {
  const [catalog, setCatalog] = useState<AfScBonusCatalog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    loadAfScBonusCatalog()
      .then((data) => {
        if (!cancelled) {
          setCatalog(data)
          setError(null)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'โหลด AF/SC ไม่สำเร็จ')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { catalog, loading, error }
}
