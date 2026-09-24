import type { CapturedStats } from '../../domain/types'
import { CAPTURED_FIELD_KEYS, type CapturedFieldKey } from './prompt'

export interface ParseSnapshotResult {
  ok: boolean
  data: Partial<CapturedStats>
  missing: CapturedFieldKey[]
  error?: string
}

function stripCodeFences(text: string): string {
  const trimmed = text.trim()
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)```$/i)
  return fenced ? fenced[1].trim() : trimmed
}

function asNumber(value: unknown): number | undefined {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string') {
    const cleaned = value.replace(/,/g, '').replace(/%/g, '').trim()
    const n = Number(cleaned)
    if (Number.isFinite(n)) return n
  }
  return undefined
}

export function parseStatSnapshot(raw: string): ParseSnapshotResult {
  if (!raw.trim()) {
    return {
      ok: false,
      data: {},
      missing: [...CAPTURED_FIELD_KEYS],
      error: 'ยังไม่มี JSON',
    }
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(stripCodeFences(raw))
  } catch {
    return {
      ok: false,
      data: {},
      missing: [...CAPTURED_FIELD_KEYS],
      error: 'JSON ไม่ถูกต้อง — ตรวจว่าคัดลอกเฉพาะ object',
    }
  }

  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return {
      ok: false,
      data: {},
      missing: [...CAPTURED_FIELD_KEYS],
      error: 'ต้องเป็น JSON object',
    }
  }

  const obj = parsed as Record<string, unknown>
  const data: Partial<CapturedStats> = {}
  const missing: CapturedFieldKey[] = []

  for (const key of CAPTURED_FIELD_KEYS) {
    const n = asNumber(obj[key])
    if (n === undefined) {
      missing.push(key)
    } else {
      data[key] = n
    }
  }

  return {
    ok: missing.length === 0,
    data,
    missing,
  }
}

/** Merge snapshot into form: overwrite captured fields only; never touch manual. */
export function applySnapshot<T extends CapturedStats>(
  current: T,
  snapshot: Partial<CapturedStats>,
): T {
  return { ...current, ...snapshot }
}
