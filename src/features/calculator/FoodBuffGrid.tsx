import { Box, Typography } from '@mui/material'
import {
  FOOD_CARDS,
  isFoodCardChecked,
  toggleFoodCard,
  type FoodBuffSelection,
} from '../../domain/foodBuffs'
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
      <Typography variant="subtitle2" sx={{ mb: 0.75, fontWeight: 600 }}>
        Food
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
        {FOOD_CARDS.map((card) => {
          const meta = byId.get(card.id)
          return (
            <BuffToggleCard
              key={card.id}
              label={meta?.name ?? card.label}
              abbr={card.abbr}
              badge={meta?.stat ?? card.percent}
              iconUrl={meta?.icon}
              checked={isFoodCardChecked(value, card)}
              onToggle={() => onChange(toggleFoodCard(value, card))}
              accent="primary"
            />
          )
        })}
      </Box>
    </Box>
  )
}
