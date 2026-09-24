import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import {
  AppBar,
  Box,
  IconButton,
  Paper,
  Snackbar,
  Alert,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import { useMemo, useState } from 'react'
import { useColorMode } from './ColorModeProvider'
import {
  computeBuffedStats,
  toBuffedCalculatorInput,
} from './domain/buffedStats'
import { DEFAULT_FOOD_BUFFS, type FoodBuffSelection } from './domain/foodBuffs'
import { DEFAULT_HYPER_SKILL, type HyperSkill } from './domain/hyperSkill'
import {
  DEFAULT_PARTY_BUFFS,
  type PartyBuffSelection,
} from './domain/partyBuffs'
import type { CalculatorInput, CapturedStats } from './domain/types'
import { BuffedStatsPanel } from './features/calculator/BuffedStatsPanel'
import { DEFAULT_INPUT } from './features/calculator/defaults'
import { FoodBuffGrid } from './features/calculator/FoodBuffGrid'
import { HyperSkillFields } from './features/calculator/HyperSkillFields'
import { PartyBuffGrid } from './features/calculator/PartyBuffGrid'
import { ResultPanel } from './features/calculator/ResultPanel'
import { StatCapturePanel } from './features/calculator/StatCapturePanel'
import { StatForm } from './features/calculator/StatForm'

interface ToastState {
  open: boolean
  message: string
  severity: 'success' | 'warning' | 'error' | 'info'
}

const tileSx = {
  p: 1.5,
  height: '100%',
  minHeight: 0,
  overflow: 'auto',
} as const

const tileFitSx = {
  p: 1.5,
  minHeight: 0,
  overflow: 'auto',
  alignSelf: { md: 'stretch' },
} as const


export default function App() {
  const { mode, toggleColorMode } = useColorMode()
  const [base, setBase] = useState<CalculatorInput>(DEFAULT_INPUT)
  const [food, setFood] = useState<FoodBuffSelection>(DEFAULT_FOOD_BUFFS)
  const [party, setParty] = useState<PartyBuffSelection>(DEFAULT_PARTY_BUFFS)
  const [hyper, setHyper] = useState<HyperSkill>(DEFAULT_HYPER_SKILL)
  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: '',
    severity: 'success',
  })

  const notify = (message: string, severity: ToastState['severity']) => {
    setToast({ open: true, message, severity })
  }

  const handleApplySnapshot = (
    patch: Partial<CapturedStats>,
    _missing: string[],
  ) => {
    setBase((prev) => ({ ...prev, ...patch }))
  }

  const buffed = useMemo(
    () => computeBuffedStats(base, food, hyper, party),
    [base, food, hyper, party],
  )
  const damageInput = useMemo(
    () => toBuffedCalculatorInput(base, buffed),
    [base, buffed],
  )

  return (
    <Box
      sx={{
        height: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        bgcolor: 'background.default',
      }}
    >
      <AppBar position="static" sx={{ flexShrink: 0 }}>
        <Toolbar
          variant="dense"
          sx={{
            gap: 1,
            minHeight: 48,
            width: '100%',
            maxWidth: 1280,
            mx: 'auto',
            px: { xs: 2, md: 3 },
          }}
        >
          <Typography
            variant="subtitle1"
            component="h1"
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            Boss Line Calc
          </Typography>
          <Tooltip title={mode === 'light' ? 'Dark mode' : 'Light mode'}>
            <IconButton
              size="small"
              onClick={toggleColorMode}
              color="inherit"
              aria-label="toggle color mode"
            >
              {mode === 'light' ? (
                <DarkModeOutlinedIcon fontSize="small" />
              ) : (
                <LightModeOutlinedIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          flex: 1,
          minHeight: 0,
          width: '100%',
          maxWidth: 1280,
          mx: 'auto',
          px: { xs: 2, md: 3 },
          py: { xs: 1, md: 1.5 },
          overflow: { xs: 'auto', md: 'hidden' },
        }}
      >
        {/*
          Bento (md+):
          ┌──────── Result (8) ────────┬─ Buffed (4) ─┐
          │  (สูงตาม content)           ├─ Hyper skill ─┤
          ├ Stats(3) ┬ Food+Party (5) ─┤   + import  ┤
          └──────────┴─────────────────┴─────────────┘
        */}
        <Box
          sx={{
            height: { xs: 'auto', md: '100%' },
            display: 'grid',
            gap: 1.5,
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(12, minmax(0, 1fr))',
            },
            gridTemplateRows: {
              xs: 'auto',
              md: 'auto minmax(0, 1fr)',
            },
            alignContent: { md: 'stretch' },
          }}
        >
          <Paper
            sx={{
              ...tileFitSx,
              gridColumn: { md: '1 / span 8' },
              gridRow: { md: '1' },
              borderTop: 3,
              borderColor: 'primary.main',
            }}
          >
            <ResultPanel
              input={damageInput}
              buffed={buffed}
              variant="hero"
              compact
            />
          </Paper>

          <Box
            sx={{
              gridColumn: { md: '9 / span 4' },
              gridRow: { md: '1 / span 2' },
              minHeight: 0,
              display: 'grid',
              gap: 1.5,
              gridTemplateRows: { xs: 'auto auto', md: 'minmax(0, 1fr) auto' },
            }}
          >
            <Paper sx={tileSx}>
              <BuffedStatsPanel buffed={buffed} compact />
            </Paper>
            <Paper sx={tileFitSx}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <HyperSkillFields value={hyper} onChange={setHyper} />
                <StatCapturePanel
                  onApply={handleApplySnapshot}
                  onNotify={notify}
                />
              </Box>
            </Paper>
          </Box>

          <Paper
            sx={{
              ...tileSx,
              gridColumn: { md: '1 / span 3' },
              gridRow: { md: '2' },
            }}
          >
            <StatForm value={base} onChange={setBase} compact />
          </Paper>

          <Paper
            sx={{
              ...tileFitSx,
              gridColumn: { md: '4 / span 5' },
              gridRow: { md: '2' },
              display: 'flex',
              flexDirection: 'column',
              gap: 1.5,
            }}
          >
            <FoodBuffGrid value={food} onChange={setFood} />
            <PartyBuffGrid value={party} onChange={setParty} />
          </Paper>
        </Box>
      </Box>

      <Snackbar
        open={toast.open}
        autoHideDuration={5000}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={toast.severity}
          onClose={() => setToast((t) => ({ ...t, open: false }))}
          variant="standard"
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
