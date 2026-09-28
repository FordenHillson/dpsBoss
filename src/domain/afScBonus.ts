/** AF / SC force bonus catalog from /boss/afScBonus.json */

export type AfScKind = 'AF' | 'SC'

export interface AfTierStats {
  atkPercent: number
  maxDmg: number
}

export interface ScTierStats {
  bossPercent: number
  critDmgPercent: number
  maxDmg: number
}

export interface AfScTier {
  id: string
  force: number
  bonusPercent?: number
  bonusFlat?: number
  stats: AfTierStats | ScTierStats
}

export interface AfScBase {
  value: number
  tiers: AfScTier[]
}

export interface AfScGroup {
  kind: AfScKind
  bases: AfScBase[]
}

export interface AfScBonusCatalog {
  af: AfScGroup
  sc: AfScGroup
}

export interface AfScSelection {
  /** e.g. "AF:220" | "SC:200" | "" */
  baseKey: string
  /** tier id from JSON, or "" */
  tierId: string
}

export const DEFAULT_AF_SC_SELECTION: AfScSelection = {
  baseKey: '',
  tierId: '',
}

export function afScBaseKey(kind: AfScKind, value: number): string {
  return `${kind}:${value}`
}

export function parseAfScBaseKey(
  key: string,
): { kind: AfScKind; value: number } | null {
  if (!key) return null
  const [kind, raw] = key.split(':')
  if (kind !== 'AF' && kind !== 'SC') return null
  const value = Number(raw)
  if (!Number.isFinite(value)) return null
  return { kind, value }
}

export function listAfScBases(
  catalog: AfScBonusCatalog | null,
): { key: string; label: string; kind: AfScKind; value: number }[] {
  if (!catalog) return []
  const out: { key: string; label: string; kind: AfScKind; value: number }[] =
    []
  for (const base of catalog.af.bases) {
    out.push({
      key: afScBaseKey('AF', base.value),
      label: `${base.value} AF`,
      kind: 'AF',
      value: base.value,
    })
  }
  for (const base of catalog.sc.bases) {
    out.push({
      key: afScBaseKey('SC', base.value),
      label: `${base.value} SC`,
      kind: 'SC',
      value: base.value,
    })
  }
  return out
}

export function findAfScBase(
  catalog: AfScBonusCatalog | null,
  baseKey: string,
): AfScBase | null {
  const parsed = parseAfScBaseKey(baseKey)
  if (!catalog || !parsed) return null
  const group = parsed.kind === 'AF' ? catalog.af : catalog.sc
  return group.bases.find((b) => b.value === parsed.value) ?? null
}

export function findAfScTier(
  catalog: AfScBonusCatalog | null,
  baseKey: string,
  tierId: string,
): AfScTier | null {
  if (!tierId) return null
  const base = findAfScBase(catalog, baseKey)
  return base?.tiers.find((t) => t.id === tierId) ?? null
}

export function formatAfScTierLabel(
  kind: AfScKind,
  tier: AfScTier,
): string {
  if (kind === 'AF') {
    const s = tier.stats as AfTierStats
    return `${tier.force} AF · ${s.atkPercent}% atk + ${s.maxDmg.toLocaleString('en-US')} max`
  }
  const s = tier.stats as ScTierStats
  return `${tier.force} SC · ${s.bossPercent}% boss + ${s.critDmgPercent}% CD`
}

/** Additive deltas applied when a tier is selected. */
export function afScStatDeltas(
  catalog: AfScBonusCatalog | null,
  selection: AfScSelection,
): {
  atkPercent: number
  bossPercent: number
  critDmgPercent: number
  maxDmg: number
} {
  const empty = {
    atkPercent: 0,
    bossPercent: 0,
    critDmgPercent: 0,
    maxDmg: 0,
  }
  const parsed = parseAfScBaseKey(selection.baseKey)
  const tier = findAfScTier(catalog, selection.baseKey, selection.tierId)
  if (!parsed || !tier) return empty

  if (parsed.kind === 'AF') {
    const s = tier.stats as AfTierStats
    return {
      ...empty,
      atkPercent: s.atkPercent,
      maxDmg: s.maxDmg,
    }
  }
  const s = tier.stats as ScTierStats
  return {
    ...empty,
    bossPercent: s.bossPercent,
    critDmgPercent: s.critDmgPercent,
    maxDmg: s.maxDmg,
  }
}
