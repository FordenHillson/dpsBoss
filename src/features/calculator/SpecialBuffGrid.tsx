import { Box, TextField, Typography } from '@mui/material'
import {
  divineEchoStatLabel,
  setPaladinFlatAtk,
  toggleDivineEcho,
  type SpecialBuffSelection,
} from '../../domain/specialBuffs'
import { BuffGroupSection } from './BuffGroupSection'
import { BuffToggleCard } from './BuffToggleCard'

interface SpecialBuffGridProps {
  value: SpecialBuffSelection
  onChange: (next: SpecialBuffSelection) => void
}

export function SpecialBuffGrid({ value, onChange }: SpecialBuffGridProps) {
  const fdLabel = divineEchoStatLabel(value.paladinFlatAtk)

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
        Special
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
        <BuffGroupSection title="Divine Echo">
          <Box sx={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 1 }}>
            <BuffToggleCard
              label="Divine Echo"
              abbr="Echo"
              statLabel={fdLabel}
              iconUrl="/buffs/icons/divineEcho.png"
              checked={value.divineEcho}
              onToggle={() => onChange(toggleDivineEcho(value))}
              accent="primary"
            />
            <TextField
              size="small"
              type="number"
              label="Paladin flat PHY ATK"
              helperText="ATK ของเพื่อน Paladin ที่ร่าย (หน้า Character Stats)"
              value={value.paladinFlatAtk || ''}
              disabled={!value.divineEcho}
              onChange={(e) => {
                const raw = e.target.value
                onChange(
                  setPaladinFlatAtk(value, raw === '' ? 0 : Number(raw)),
                )
              }}
              inputProps={{ min: 0, step: 1 }}
              fullWidth
            />
          </Box>
        </BuffGroupSection>
      </Box>
    </Box>
  )
}
