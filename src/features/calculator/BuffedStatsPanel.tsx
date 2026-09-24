import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import type { BuffedStats } from '../../domain/buffedStats'
import { formatPercentFraction } from './defaults'

interface BuffedStatsPanelProps {
  buffed: BuffedStats
  compact?: boolean
}

function pct(n: number): string {
  return `${n.toLocaleString('en-US', { maximumFractionDigits: 2 })}%`
}

export function BuffedStatsPanel({
  buffed,
  compact = false,
}: BuffedStatsPanelProps) {
  const rows: { label: string; value: string; muted?: boolean }[] = [
    { label: 'Phys/Mag Atk', value: buffed.atk.toLocaleString('en-US') },
    { label: 'Phys/Mag Atk %', value: pct(buffed.atkPercent) },
    { label: 'Phys/Mag Dmg %', value: pct(buffed.dmgPercent) },
    { label: 'Boss Atk %', value: pct(buffed.bossPercent) },
    { label: 'Crit Rate %', value: pct(buffed.critRatePercent) },
    {
      label: 'Crit rate max',
      value: pct(buffed.critRateMaxPercent),
      muted: true,
    },
    { label: 'Crit Dmg %', value: pct(buffed.critDmgPercent) },
    { label: 'Skill %', value: pct(buffed.skillPercent) },
    { label: 'Final Dmg %', value: pct(buffed.finalDmgPercent) },
    { label: 'IED / DIR %', value: pct(buffed.iedPercent) },
    {
      label: 'Level modifier',
      value: formatPercentFraction(buffed.levelModifier),
      muted: true,
    },
  ]

  const cellPy = compact ? 0.55 : 0.85
  const fontSize = compact ? '0.875rem' : '0.9375rem'

  return (
    <Box>
      <Typography
        variant={compact ? 'subtitle1' : 'h6'}
        gutterBottom
        sx={{ mb: compact ? 0.75 : 1, fontWeight: 600 }}
      >
        Buffed stats
      </Typography>
      <Table size="small">
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.label}>
              <TableCell
                sx={{
                  color: row.muted ? 'text.secondary' : 'text.primary',
                  borderColor: 'divider',
                  py: cellPy,
                  px: 1.25,
                  fontSize,
                  lineHeight: 1.35,
                }}
              >
                {row.label}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  bgcolor: 'action.hover',
                  fontWeight: 600,
                  borderColor: 'divider',
                  py: cellPy,
                  px: 1.25,
                  fontSize,
                  lineHeight: 1.35,
                  fontVariantNumeric: 'tabular-nums',
                  color: row.muted ? 'text.secondary' : 'text.primary',
                }}
              >
                {row.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}
