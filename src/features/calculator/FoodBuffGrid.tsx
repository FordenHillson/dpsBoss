import { Box, Typography } from '@mui/material'
import {
  FOOD_BUFF_GROUP_ORDER,
  FOOD_CARDS,
  isFoodCardChecked,
  toggleFoodCard,
  type FoodBuffSelection,
} from '../../domain/foodBuffs'
import { BuffGroupSection } from './BuffGroupSection'
import { BuffToggleCard } from './BuffToggleCard'
import { useFoodBuffCatalog } from './useBuffCatalog'

interface FoodBuffGridProps {
  value: FoodBuffSelection
  onChange: (next: FoodBuffSelection) => void
}

export function FoodBuffGrid({ value, onChange }: FoodBuffGridProps) {
  const { byId } = useFoodBuffCatalog()

  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
        Food
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.25 }}>
        {FOOD_BUFF_GROUP_ORDER.map((group) => {
          const cards = FOOD_CARDS.filter((c) => c.group === group)
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
                    checked={isFoodCardChecked(value, card)}
                    onToggle={() => onChange(toggleFoodCard(value, card))}
                    accent="primary"
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
