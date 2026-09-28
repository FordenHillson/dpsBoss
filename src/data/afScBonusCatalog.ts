import type { AfScBonusCatalog, AfScGroup, AfScTier } from '../domain/afScBonus'
import { publicUrl } from './publicUrl'

let cache: AfScBonusCatalog | null = null
let promise: Promise<AfScBonusCatalog> | null = null

function isRecord(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === 'object' && !Array.isArray(v)
}

function parseTier(row: unknown): AfScTier | null {
  if (!isRecord(row)) return null
  if (typeof row.id !== 'string' || typeof row.force !== 'number') return null
  if (!isRecord(row.stats)) return null
  return {
    id: row.id,
    force: row.force,
    bonusPercent:
      typeof row.bonusPercent === 'number' ? row.bonusPercent : undefined,
    bonusFlat: typeof row.bonusFlat === 'number' ? row.bonusFlat : undefined,
    stats: row.stats as unknown as AfScTier['stats'],
  }
}

function parseGroup(row: unknown, kind: 'AF' | 'SC'): AfScGroup | null {
  if (!isRecord(row) || !Array.isArray(row.bases)) return null
  const bases = row.bases
    .map((b) => {
      if (!isRecord(b) || typeof b.value !== 'number' || !Array.isArray(b.tiers)) {
        return null
      }
      const tiers = b.tiers.map(parseTier).filter((t): t is AfScTier => !!t)
      return { value: b.value, tiers }
    })
    .filter((b): b is { value: number; tiers: AfScTier[] } => !!b)
  return { kind, bases }
}

function parseCatalog(data: unknown): AfScBonusCatalog | null {
  if (!isRecord(data)) return null
  const af = parseGroup(data.af, 'AF')
  const sc = parseGroup(data.sc, 'SC')
  if (!af || !sc) return null
  return { af, sc }
}

export function loadAfScBonusCatalog(): Promise<AfScBonusCatalog> {
  if (cache) return Promise.resolve(cache)
  if (!promise) {
    promise = fetch(publicUrl('/boss/afScBonus.json'))
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`โหลด AF/SC bonus ไม่สำเร็จ: ${res.status}`)
        }
        const data: unknown = await res.json()
        const parsed = parseCatalog(data)
        if (!parsed) {
          throw new Error('รูปแบบ afScBonus.json ไม่ถูกต้อง')
        }
        cache = parsed
        return parsed
      })
      .catch((err) => {
        promise = null
        throw err
      })
  }
  return promise
}
