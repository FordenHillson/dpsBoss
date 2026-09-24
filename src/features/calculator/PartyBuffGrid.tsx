import { Box, Typography } from '@mui/material'
import {
  PARTY_CARDS,
  togglePartyCard,
  type PartyBuffSelection,
} from '../../domain/partyBuffs'
import { BuffToggleCard } from './BuffToggleCard'
import { usePartyBuffCatalog } from './useBuffCatalog'

interface PartyBuffGridProps {
  value: PartyBuffSelection
  onChange: (next: PartyBuffSelection) => void
}

export function PartyBuffGrid({ value, onChange }: PartyBuffGridProps) {
  const { byId } = usePartyBuffCatalog()

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 0.75, fontWeight: 600 }}>
        Party
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 0.75,
          alignItems: 'flex-start',
        }}
      >
        {PARTY_CARDS.map((card) => {
          const meta = byId.get(card.id)
          return (
            <BuffToggleCard
              key={card.id}
              label={meta?.name ?? card.label}
              abbr={card.abbr}
              badge={meta?.stat}
              iconUrl={meta?.icon}
              checked={value[card.id]}
              onToggle={() => onChange(togglePartyCard(value, card.id))}
              accent="secondary"
            />
          )
        })}
      </Box>
    </Box>
  )
}
