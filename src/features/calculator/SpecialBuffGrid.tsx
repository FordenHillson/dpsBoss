import { Box, Typography } from '@mui/material'
import {
  divineEchoStatLabel,
  toggleDivineEcho,
  type SpecialBuffSelection,
} from '../../domain/specialBuffs'
import { BuffGroupSection } from './BuffGroupSection'
import { BuffToggleCard } from './BuffToggleCard'

interface SpecialBuffGridProps {
  value: SpecialBuffSelection
  onChange: (next: SpecialBuffSelection) => void
  /** Flat Phys/Mag Atk — used for Divine Echo Final DMG scaling. */
  flatAtk: number
}

export function SpecialBuffGrid({
  value,
  onChange,
  flatAtk,
}: SpecialBuffGridProps) {
  const fdLabel = divineEchoStatLabel(flatAtk)

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
        Special
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
        <BuffGroupSection title="Divine Echo">
          <BuffToggleCard
            label="Divine Echo"
            abbr="Echo"
            statLabel={fdLabel}
            iconUrl="/buffs/icons/divineEcho.png"
            checked={value.divineEcho}
            onToggle={() => onChange(toggleDivineEcho(value))}
            accent="primary"
          />
        </BuffGroupSection>
      </Box>
    </Box>
  )
}
