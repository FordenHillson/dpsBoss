export const CAPTURED_FIELD_KEYS = [
  'level',
  'atk',
  'atkPercent',
  'dmgPercent',
  'bossPercent',
  'critRatePercent',
  'critDmgPercent',
  'finalDmgPercent',
  'iedPercent',
  'maxDmg',
] as const

export const MANUAL_FIELD_KEYS = [
  'skillPercent',
  'monsterLevel',
  'bossPdrPercent',
] as const

export const STAT_CAPTURE_PROMPT = `You are extracting MapleStory Character Stats from a screenshot into JSON.

Return ONLY a single JSON object (no markdown fences, no commentary) with these exact keys:
{
  "level": <number>,
  "atk": <number>,
  "atkPercent": <number>,
  "dmgPercent": <number>,
  "bossPercent": <number>,
  "critRatePercent": <number>,
  "critDmgPercent": <number>,
  "finalDmgPercent": <number>,
  "iedPercent": <number>,
  "maxDmg": <number>
}

Rules:
- Percents are human-readable as shown on the UI (example: 253.4 means 253.4%, NOT 2.534).
- "atk" is Phys Atk or Mag Atk (Attack) as a plain number.
- "iedPercent" is Ignore Defense / Defense Ignore from the stats page.
- "maxDmg" is damage cap / max damage if visible; if not visible omit the key.
- Do not invent party/food buffs. Read only what is visible.
- If a value uses commas (e.g. 203,027,499), output a plain number 203027499.
`

export type CapturedFieldKey = (typeof CAPTURED_FIELD_KEYS)[number]
export type ManualFieldKey = (typeof MANUAL_FIELD_KEYS)[number]
