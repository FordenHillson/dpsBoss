import { useState } from 'react'
import { Box, Checkbox, Typography } from '@mui/material'
import { publicUrl } from '../../data/publicUrl'
import { styleUi } from '../../theme'

export const BUFF_ICON_SIZE = 40

interface BuffToggleCardProps {
  label: string
  abbr: string
  /** Human-readable buff effect, e.g. "+30%" */
  statLabel: string
  checked: boolean
  onToggle: () => void
  accent?: 'primary' | 'secondary'
  /** Image URL from buff JSON, e.g. /buffs/icons/candyBasket.png */
  iconUrl?: string
}

export function BuffToggleCard({
  label,
  abbr,
  statLabel,
  checked,
  onToggle,
  accent = 'primary',
  iconUrl,
}: BuffToggleCardProps) {
  const [imgFailed, setImgFailed] = useState(false)
  const showImg = Boolean(iconUrl) && !imgFailed

  const borderChecked =
    accent === 'secondary' ? 'secondary.main' : 'primary.main'
  const borderHover =
    accent === 'secondary' ? 'secondary.light' : 'primary.light'

  return (
    <Box
      component="button"
      type="button"
      onClick={onToggle}
      aria-pressed={checked}
      aria-label={label}
      sx={(t) => {
        const dark = t.palette.mode === 'dark'
        const idleBg = dark ? 'rgba(255, 255, 255, 0.06)' : styleUi.gray[100]
        const hoverBg = dark ? 'rgba(255, 255, 255, 0.1)' : styleUi.gray[200]
        const selectedBg = t.palette.action.selected
        return {
          width: '100%',
          m: 0,
          py: 0.75,
          px: 1,
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1,
          textAlign: 'left',
          borderRadius: 1,
          border: 1,
          borderColor: checked
            ? borderChecked
            : dark
              ? styleUi.gray[600]
              : styleUi.gray[300],
          bgcolor: checked ? selectedBg : idleBg,
          boxShadow: 'none',
          font: 'inherit',
          color: 'inherit',
          transition: t.transitions.create(
            ['border-color', 'background-color'],
            { duration: t.transitions.duration.shorter },
          ),
          '&:hover': {
            borderColor: checked
              ? borderChecked
              : dark
                ? styleUi.gray[300]
                : borderHover,
            bgcolor: checked ? selectedBg : hoverBg,
          },
        }
      }}
    >
      <Box
        sx={(t) => ({
          width: BUFF_ICON_SIZE,
          height: BUFF_ICON_SIZE,
          flex: '0 0 auto',
          borderRadius: 1,
          bgcolor:
            t.palette.mode === 'dark'
              ? 'rgba(0, 0, 0, 0.28)'
              : styleUi.gray[200],
          color: 'text.secondary',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          typography: 'caption',
          fontWeight: 700,
          fontSize: 10,
          textAlign: 'center',
          lineHeight: 1.1,
          px: 0.25,
          overflow: 'hidden',
        })}
      >
        {showImg ? (
          <Box
            component="img"
            key={iconUrl}
            src={iconUrl ? publicUrl(iconUrl) : undefined}
            alt=""
            onError={() => setImgFailed(true)}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        ) : (
          abbr
        )}
      </Box>

      <Box
        sx={{
          flex: '1 1 auto',
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 0.35,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            fontSize: 13,
            lineHeight: 1.2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </Typography>
        <Box
          sx={{
            alignSelf: 'flex-start',
            px: 0.75,
            py: 0.15,
            borderRadius: 0.75,
            bgcolor: styleUi.yellow[200],
            color: styleUi.yellow[700],
            typography: 'caption',
            fontWeight: 700,
            fontSize: 11,
            lineHeight: 1.4,
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {statLabel}
        </Box>
      </Box>

      <Checkbox
        size="small"
        checked={checked}
        tabIndex={-1}
        disableRipple
        color={accent}
        sx={{ p: 0, flex: '0 0 auto', '& .MuiSvgIcon-root': { fontSize: 20 } }}
      />
    </Box>
  )
}
