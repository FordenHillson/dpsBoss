import { Grid, TextField, Typography, Box } from '@mui/material'
import type { HyperSkill } from '../../domain/hyperSkill'

interface HyperSkillFieldsProps {
  value: HyperSkill
  onChange: (next: HyperSkill) => void
}

const FIELDS: { key: keyof HyperSkill; label: string }[] = [
  { key: 'paMaAtkPercent', label: 'PA/MA Atk %' },
  { key: 'bossAtkPercent', label: 'Boss Atk %' },
  { key: 'critDmgPercent', label: 'Crit Dmg %' },
  { key: 'finalDmgPercent', label: 'Final Dmg %' },
]

export function HyperSkillFields({ value, onChange }: HyperSkillFieldsProps) {
  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        Hyper skill
      </Typography>
      <Grid container spacing={1}>
        {FIELDS.map(({ key, label }) => (
          <Grid key={key} size={{ xs: 6 }}>
            <TextField
              label={label}
              type="number"
              size="small"
              fullWidth
              value={value[key]}
              onChange={(e) => {
                const n = Number(e.target.value)
                onChange({
                  ...value,
                  [key]: Number.isFinite(n) ? n : 0,
                })
              }}
              slotProps={{ htmlInput: { step: 'any' } }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
