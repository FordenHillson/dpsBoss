import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import type { BuffedStats } from '../../domain/buffedStats'
import { calculateBossDamage } from '../../domain/bossDamage'
import type { CalculatorInput } from '../../domain/types'
import { MaterialSymbol } from '../../components/MaterialSymbol'
import { styleUi } from '../../theme'
import { formatDamage, formatPercentFraction } from './defaults'

interface ResultPanelProps {
  input: CalculatorInput
  buffed?: BuffedStats
  /** Full-width hero strip for Results-first layout */
  variant?: 'default' | 'hero'
  compact?: boolean
}

type StageTone = 'raw' | 'level' | 'ied'

const STAGE_TONES: Record<
  StageTone,
  { bg: string; border: string; title: string; muted: string }
> = {
  raw: {
    bg: styleUi.gray[200],
    border: styleUi.gray[300],
    title: styleUi.gray[700],
    muted: styleUi.gray[600],
  },
  level: {
    bg: styleUi.sky[200],
    border: styleUi.sky[300],
    title: styleUi.sky[700],
    muted: styleUi.sky[700],
  },
  ied: {
    bg: styleUi.green[200],
    border: styleUi.green[300],
    title: styleUi.green[700],
    muted: styleUi.green[700],
  },
}

function StageCard({
  title,
  tone,
  nonCrit,
  mid,
  cappedMid,
  low,
  high,
}: {
  title: string
  tone: StageTone
  nonCrit: number
  mid: number
  cappedMid: number
  low: number
  high: number
}) {
  const colors = STAGE_TONES[tone]
  return (
    <Paper
      sx={{
        p: 1.5,
        height: '100%',
        bgcolor: colors.bg,
        borderColor: colors.border,
        color: colors.title,
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: 600, mb: 1, color: colors.title }}
      >
        {title}
      </Typography>
      <Stack spacing={0.75}>
        <Typography variant="body2">
          Non-Crit: {formatDamage(nonCrit)}
        </Typography>
        <Typography variant="body2">Crit mid: {formatDamage(mid)}</Typography>
        <Typography variant="body2">
          Crit mid (cap): {formatDamage(cappedMid)}
        </Typography>
        <Typography variant="body2" sx={{ color: colors.muted, opacity: 0.85 }}>
          Crit Low–High: {formatDamage(low)} – {formatDamage(high)}
        </Typography>
      </Stack>
    </Paper>
  )
}

export function ResultPanel({
  input,
  buffed,
  variant = 'default',
  compact = false,
}: ResultPanelProps) {
  let error: string | null = null
  let result = null
  try {
    result = calculateBossDamage(input)
  } catch (e) {
    error = e instanceof Error ? e.message : 'คำนวณไม่สำเร็จ'
  }

  if (error || !result) {
    return (
      <Typography color="error" variant="body2">
        {error}
      </Typography>
    )
  }

  const { afterIed, levelModifier, iedMultiplier, raw, afterLevel } = result
  const isHero = variant === 'hero'
  const stackGap = compact ? 1.25 : isHero ? 2 : 2
  const mainVariant = compact ? 'h4' : isHero ? 'h3' : 'h5'
  const showCap = afterIed.cappedMid !== afterIed.crit.mid

  return (
    <Stack spacing={stackGap}>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <MaterialSymbol
          name="swords"
          size={compact ? 22 : 26}
          sx={{ color: 'primary.main' }}
        />
        <Typography
          variant={compact ? 'subtitle1' : isHero ? 'h5' : 'h6'}
          component="h2"
          sx={{ fontWeight: 600 }}
        >
          Boss Damage Line
        </Typography>
      </Stack>

      {/* Primary: Crit mid หลัง Level × IED */}
      <Box>
        <Stack
          direction="row"
          spacing={0.5}
          sx={{ alignItems: 'center', mb: 0.25 }}
        >
          <MaterialSymbol
            name="crisis_alert"
            size={16}
            sx={{ color: 'text.secondary' }}
          />
          <Typography variant="caption" color="text.secondary">
            Crit mid · หลัง Level × IED
          </Typography>
        </Stack>
        <Typography
          variant={mainVariant}
          component="p"
          sx={{
            fontWeight: 600,
            letterSpacing: isHero && !compact ? -0.5 : 0,
            my: 0,
            lineHeight: 1.15,
          }}
        >
          {formatDamage(afterIed.crit.mid)}
        </Typography>
        <Stack
          direction="row"
          spacing={0.75}
          sx={{ alignItems: 'center', mt: 0.75 }}
        >
          <MaterialSymbol
            name="straighten"
            size={16}
            sx={{ color: 'text.secondary' }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontVariantNumeric: 'tabular-nums' }}
          >
            Low {formatDamage(afterIed.crit.low)}
            <Box component="span" sx={{ mx: 1, opacity: 0.4 }}>
              –
            </Box>
            High {formatDamage(afterIed.crit.high)}
          </Typography>
        </Stack>
      </Box>

      {/* Secondary metrics */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: showCap ? '1fr 1fr' : '1fr',
          gap: 1.5,
          maxWidth: showCap ? 360 : 180,
        }}
      >
        {showCap ? (
          <Box>
            <Stack
              direction="row"
              spacing={0.5}
              sx={{ alignItems: 'center' }}
            >
              <MaterialSymbol
                name="vertical_align_top"
                size={14}
                sx={{ color: 'text.secondary' }}
              />
              <Typography variant="caption" color="text.secondary">
                Crit mid (cap)
              </Typography>
            </Stack>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {formatDamage(afterIed.cappedMid)}
            </Typography>
          </Box>
        ) : null}
        <Box>
          <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
            <MaterialSymbol
              name="remove"
              size={14}
              sx={{ color: 'text.secondary' }}
            />
            <Typography variant="caption" color="text.secondary">
              Non-Crit
            </Typography>
          </Stack>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            {formatDamage(afterIed.nonCrit)}
          </Typography>
        </Box>
      </Box>

      {/* Modifier strip */}
      <Stack
        direction="row"
        useFlexGap
        spacing={0.75}
        sx={{ flexWrap: 'wrap', rowGap: 0.75 }}
      >
        {(
          [
            {
              icon: 'height',
              label: `Lv ${formatPercentFraction(levelModifier)}`,
            },
            {
              icon: 'shield',
              label: `IED × ${formatPercentFraction(iedMultiplier)}`,
            },
            buffed
              ? {
                  icon: 'security',
                  label: `DIR ${buffed.iedPercent.toFixed(1)}%`,
                }
              : null,
            buffed
              ? {
                  icon: 'stadia_controller',
                  label: `Boss ${buffed.bossPercent.toFixed(0)}%`,
                }
              : null,
            buffed
              ? {
                  icon: 'bolt',
                  label: `CD ${buffed.critDmgPercent.toFixed(0)}%`,
                }
              : null,
          ] as ({ icon: string; label: string } | null)[]
        )
          .filter(Boolean)
          .map((item) => {
            const { icon, label } = item as { icon: string; label: string }
            return (
              <Box
                key={label}
                sx={{
                  px: 1,
                  py: 0.35,
                  borderRadius: 1,
                  border: 1,
                  borderColor: 'divider',
                  typography: 'caption',
                  color: 'text.secondary',
                  fontVariantNumeric: 'tabular-nums',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                <MaterialSymbol name={icon} size={14} />
                {label}
              </Box>
            )
          })}
      </Stack>



      <Divider />

      <Accordion
        defaultExpanded={false}
        disableGutters
        elevation={0}
        sx={compact ? { '& .MuiAccordionSummary-root': { minHeight: 36 } } : undefined}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="body2">รายละเอียด</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={1.5}>
            <Grid size={{ xs: 12, md: 4 }}>
              <StageCard
                title="raw"
                tone="raw"
                nonCrit={raw.nonCrit}
                mid={raw.crit.mid}
                cappedMid={raw.cappedMid}
                low={raw.crit.low}
                high={raw.crit.high}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <StageCard
                title="Level Difference modifier"
                tone="level"
                nonCrit={afterLevel.nonCrit}
                mid={afterLevel.crit.mid}
                cappedMid={afterLevel.cappedMid}
                low={afterLevel.crit.low}
                high={afterLevel.crit.high}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <StageCard
                title="IED modifier"
                tone="ied"
                nonCrit={afterIed.nonCrit}
                mid={afterIed.crit.mid}
                cappedMid={afterIed.cappedMid}
                low={afterIed.crit.low}
                high={afterIed.crit.high}
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Stack>
  )
}
