import {
  Box,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import type { ReactNode } from 'react'
import type { AfScSelection } from '../../domain/afScBonus'
import {
  findAfScBase,
  formatAfScTierLabel,
  listAfScBases,
  parseAfScBaseKey,
} from '../../domain/afScBonus'
import type { HyperSkill } from '../../domain/hyperSkill'
import type { CalculatorInput } from '../../domain/types'
import { styleUi } from '../../theme'
import { useAfScBonusCatalog } from './useAfScBonusCatalog'

interface StatFormProps {
  value: CalculatorInput
  onChange: (next: CalculatorInput) => void
  hyper: HyperSkill
  onChangeHyper: (next: HyperSkill) => void
  afSc: AfScSelection
  onChangeAfSc: (next: AfScSelection) => void
  compact?: boolean
}

function NumField({
  label,
  field,
  value,
  onChange,
}: {
  label: string
  field: keyof CalculatorInput
  value: CalculatorInput
  onChange: (next: CalculatorInput) => void
}) {
  return (
    <TextField
      label={label}
      type="number"
      fullWidth
      size="small"
      value={value[field]}
      onChange={(e) => {
        const n = Number(e.target.value)
        onChange({ ...value, [field]: Number.isFinite(n) ? n : 0 })
      }}
      slotProps={{ htmlInput: { step: 'any' } }}
    />
  )
}

const HYPER_FIELDS: { key: keyof HyperSkill; label: string }[] = [
  { key: 'paMaAtkPercent', label: 'PA/MA Atk %' },
  { key: 'bossAtkPercent', label: 'Boss Atk %' },
  { key: 'critDmgPercent', label: 'Crit Dmg %' },
  { key: 'finalDmgPercent', label: 'Final Dmg %' },
]

function SectionCard({
  title,
  compact,
  children,
}: {
  title: string
  compact?: boolean
  children: ReactNode
}) {
  return (
    <Box
      sx={(t) => ({
        p: compact ? 1.25 : 1.5,
        borderRadius: 1,
        border: 1,
        borderColor: 'divider',
        bgcolor:
          t.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.04)'
            : styleUi.gray[100],
      })}
    >
      <Typography
        variant="subtitle2"
        sx={{ mb: compact ? 1 : 1.25, fontWeight: 700 }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  )
}

export function StatForm({
  value,
  onChange,
  hyper,
  onChangeHyper,
  afSc,
  onChangeAfSc,
  compact = false,
}: StatFormProps) {
  const gap = compact ? 1 : 2
  const titleVariant = compact ? 'subtitle2' : 'h6'
  const { catalog, loading, error } = useAfScBonusCatalog()
  const bases = listAfScBases(catalog)
  const selectedBase = findAfScBase(catalog, afSc.baseKey)
  const parsed = parseAfScBaseKey(afSc.baseKey)

  return (
    <Stack spacing={gap}>
      <Typography variant={titleVariant} sx={{ fontWeight: 600 }}>
        สเตต
      </Typography>
      <Grid container spacing={gap}>
        <Grid size={{ xs: 6 }}>
          <NumField label="Level" field="level" value={value} onChange={onChange} />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <NumField label="ATK" field="atk" value={value} onChange={onChange} />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <NumField label="ATK %" field="atkPercent" value={value} onChange={onChange} />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <NumField label="Damage %" field="dmgPercent" value={value} onChange={onChange} />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <NumField label="Boss %" field="bossPercent" value={value} onChange={onChange} />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <NumField
            label="Crit Rate %"
            field="critRatePercent"
            value={value}
            onChange={onChange}
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <NumField
            label="Crit Dmg %"
            field="critDmgPercent"
            value={value}
            onChange={onChange}
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <NumField
            label="Final Dmg %"
            field="finalDmgPercent"
            value={value}
            onChange={onChange}
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <NumField label="IED %" field="iedPercent" value={value} onChange={onChange} />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <NumField label="Max Dmg" field="maxDmg" value={value} onChange={onChange} />
        </Grid>
      </Grid>

      <Divider />

      <Typography variant={titleVariant} sx={{ fontWeight: 600 }}>
        กรอกมือ
      </Typography>

      <SectionCard title="Skill" compact={compact}>
        <Grid container spacing={gap}>
          <Grid size={12}>
            <NumField
              label="Skill %"
              field="skillPercent"
              value={value}
              onChange={onChange}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={value.skillPhyMagDmg10}
                  onChange={(e) =>
                    onChange({ ...value, skillPhyMagDmg10: e.target.checked })
                  }
                />
              }
              label="Phy/Mag DMG 10%"
              sx={{ ml: 0, mr: 0 }}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  checked={value.skillIed15}
                  onChange={(e) =>
                    onChange({ ...value, skillIed15: e.target.checked })
                  }
                />
              }
              label="IED 15%"
              sx={{ ml: 0, mr: 0 }}
            />
          </Grid>

          <Grid size={12}>
            <Typography
              variant="caption"
              sx={{ fontWeight: 700, color: 'text.secondary' }}
            >
              Hyper skill
            </Typography>
          </Grid>
          {HYPER_FIELDS.map(({ key, label }) => (
            <Grid key={key} size={{ xs: 6 }}>
              <TextField
                label={label}
                type="number"
                size="small"
                fullWidth
                value={hyper[key]}
                onChange={(e) => {
                  const n = Number(e.target.value)
                  onChangeHyper({
                    ...hyper,
                    [key]: Number.isFinite(n) ? n : 0,
                  })
                }}
                slotProps={{ htmlInput: { step: 'any' } }}
              />
            </Grid>
          ))}
        </Grid>
      </SectionCard>

      <SectionCard title="Boss setting" compact={compact}>
        <Grid container spacing={gap}>
          <Grid size={12}>
            <NumField
              label="Monster Level"
              field="monsterLevel"
              value={value}
              onChange={onChange}
            />
          </Grid>
          <Grid size={12}>
            <NumField
              label="DEF %"
              field="bossPdrPercent"
              value={value}
              onChange={onChange}
            />
          </Grid>
          <Grid size={12}>
            <NumField
              label="Crit Res %"
              field="critResPercent"
              value={value}
              onChange={onChange}
            />
          </Grid>
        </Grid>
      </SectionCard>

      <SectionCard title="AF/SC Bonus" compact={compact}>
        <Grid container spacing={gap}>
          <Grid size={{ xs: 6 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="afsc-base-label">Force</InputLabel>
              <Select
                labelId="afsc-base-label"
                label="Force"
                value={afSc.baseKey}
                disabled={loading || !!error}
                onChange={(e) => {
                  const baseKey = e.target.value
                  const base = findAfScBase(catalog, baseKey)
                  onChangeAfSc({
                    baseKey,
                    tierId: base?.tiers[0]?.id ?? '',
                  })
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {bases.map((b) => (
                  <MenuItem key={b.key} value={b.key}>
                    {b.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 6 }}>
            <FormControl fullWidth size="small">
              <InputLabel id="afsc-tier-label">Bonus</InputLabel>
              <Select
                labelId="afsc-tier-label"
                label="Bonus"
                value={afSc.tierId}
                disabled={!selectedBase || loading || !!error}
                onChange={(e) =>
                  onChangeAfSc({ ...afSc, tierId: e.target.value })
                }
              >
                {!selectedBase ? (
                  <MenuItem value="">
                    <em>เลือก Force ก่อน</em>
                  </MenuItem>
                ) : (
                  selectedBase.tiers.map((tier) => (
                    <MenuItem key={tier.id} value={tier.id}>
                      {formatAfScTierLabel(parsed!.kind, tier)}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>
          {error ? (
            <Grid size={12}>
              <Typography variant="caption" color="error">
                {error}
              </Typography>
            </Grid>
          ) : null}
        </Grid>
      </SectionCard>
    </Stack>
  )
}
