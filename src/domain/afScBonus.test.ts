import { describe, expect, it } from 'vitest'
import {
  afScBaseKey,
  afScStatDeltas,
  formatAfScTierLabel,
  listAfScBases,
  type AfScBonusCatalog,
} from './afScBonus'

const sampleCatalog: AfScBonusCatalog = {
  af: {
    kind: 'AF',
    bases: [
      {
        value: 220,
        tiers: [
          {
            id: 'af-220-110',
            bonusPercent: 110,
            force: 242,
            stats: { atkPercent: 12, maxDmg: 1000 },
          },
          {
            id: 'af-220-120',
            bonusPercent: 120,
            force: 264,
            stats: { atkPercent: 15, maxDmg: 2000 },
          },
        ],
      },
    ],
  },
  sc: {
    kind: 'SC',
    bases: [
      {
        value: 200,
        tiers: [
          {
            id: 'sc-200-10',
            bonusFlat: 10,
            force: 210,
            stats: { bossPercent: 5, critDmgPercent: 8, maxDmg: 500 },
          },
        ],
      },
    ],
  },
}

describe('afScBonus', () => {
  it('lists AF then SC bases', () => {
    expect(listAfScBases(sampleCatalog).map((b) => b.key)).toEqual([
      'AF:220',
      'SC:200',
    ])
  })

  it('applies AF tier stats', () => {
    expect(
      afScStatDeltas(sampleCatalog, {
        baseKey: afScBaseKey('AF', 220),
        tierId: 'af-220-110',
      }),
    ).toEqual({
      atkPercent: 12,
      bossPercent: 0,
      critDmgPercent: 0,
      maxDmg: 1000,
    })
  })

  it('applies SC tier stats', () => {
    expect(
      afScStatDeltas(sampleCatalog, {
        baseKey: afScBaseKey('SC', 200),
        tierId: 'sc-200-10',
      }),
    ).toEqual({
      atkPercent: 0,
      bossPercent: 5,
      critDmgPercent: 8,
      maxDmg: 500,
    })
  })

  it('formats tier labels', () => {
    const tier = sampleCatalog.af.bases[0].tiers[0]
    expect(formatAfScTierLabel('AF', tier)).toBe(
      '242 AF · 12% atk + 1,000 max',
    )
  })
})
