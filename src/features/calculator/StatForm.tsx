import { Grid, TextField, Typography, Stack, Divider } from '@mui/material'
import type { CalculatorInput } from '../../domain/types'

interface StatFormProps {
  value: CalculatorInput
  onChange: (next: CalculatorInput) => void
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

export function StatForm({ value, onChange, compact = false }: StatFormProps) {
  const gap = compact ? 1 : 2
  const titleVariant = compact ? 'subtitle2' : 'h6'

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
      <Grid container spacing={gap}>
        <Grid size={12}>
          <NumField
            label="Skill %"
            field="skillPercent"
            value={value}
            onChange={onChange}
          />
        </Grid>
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
            label="Boss PDR %"
            field="bossPdrPercent"
            value={value}
            onChange={onChange}
          />
        </Grid>
      </Grid>
    </Stack>
  )
}
