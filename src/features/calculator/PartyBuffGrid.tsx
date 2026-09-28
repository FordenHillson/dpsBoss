import { Box, Typography } from '@mui/material'
import {
  PARTY_BUFF_GROUP_ORDER,
  PARTY_CARDS,
  togglePartyCard,
  type PartyBuffSelection,
} from '../../domain/partyBuffs'
import { BuffGroupSection } from './BuffGroupSection'
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
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
        Party
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
        {PARTY_BUFF_GROUP_ORDER.map((group) => {
          const cards = PARTY_CARDS.filter((c) => c.group === group)
          if (cards.length === 0) return null
          return (
            <BuffGroupSection key={group} title={group}>
              {cards.map((card) => {
                const meta = byId.get(card.id)
                return (
                  <BuffToggleCard
                    key={card.id}
                    label={meta?.name ?? card.label}
                    abbr={card.abbr}
                    statLabel={card.statLabel}
                    iconUrl={meta?.icon}
                    checked={value[card.id]}
                    onToggle={() => onChange(togglePartyCard(value, card.id))}
                    accent="secondary"
                  />
                )
              })}
            </BuffGroupSection>
          )
        })}
      </Box>
    </Box>
  )
}
