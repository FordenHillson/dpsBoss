import { useState } from 'react'
import { Box, Checkbox, Tooltip } from '@mui/material'

/** Fixed size so Food / Party cards share the same scale. */
export const BUFF_CARD_SIZE = 76
export const BUFF_ICON_SIZE = 60

interface BuffToggleCardProps {
  label: string
  abbr: string
  checked: boolean
  onToggle: () => void
  accent?: 'primary' | 'secondary'
  /** Badge number; omit or 0 to hide */
  badge?: string | number
  /** Image URL from buff JSON, e.g. /buffs/icons/candyBasket.png */
  iconUrl?: string
}

export function BuffToggleCard({
  label,
  abbr,
  checked,
  onToggle,
  accent = 'primary',
  badge,
  iconUrl,
}: BuffToggleCardProps) {
  const [imgFailed, setImgFailed] = useState(false)
  const showBadge = badge != null && badge !== 0 && badge !== '0'
  const showImg = Boolean(iconUrl) && !imgFailed

  const borderChecked =
    accent === 'secondary' ? 'secondary.main' : 'primary.main'
  const borderHover =
    accent === 'secondary' ? 'secondary.light' : 'primary.light'

  return (
    <Tooltip title={label} enterDelay={400}>
      <Box
        component="button"
        type="button"
        onClick={onToggle}
        aria-pressed={checked}
        aria-label={label}
        sx={{
          width: BUFF_CARD_SIZE,
          flex: '0 0 auto',
          m: 0,
          p: 0.75,
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.5,
          borderRadius: 1,
          border: 1,
          borderColor: checked ? borderChecked : 'divider',
          bgcolor: checked ? 'action.selected' : 'background.paper',
          boxShadow: 'none',
          font: 'inherit',
          color: 'inherit',
          transition: (t) =>
            t.transitions.create(['border-color', 'background-color'], {
              duration: t.transitions.duration.shorter,
            }),
          '&:hover': {
            borderColor: checked ? borderChecked : borderHover,
            bgcolor: checked ? 'action.selected' : 'action.hover',
          },
        }}
      >
        <Box
          sx={{
            width: BUFF_ICON_SIZE,
            height: BUFF_ICON_SIZE,
            borderRadius: 1,
            bgcolor: 'background.default',
            color: 'text.secondary',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            typography: 'caption',
            fontWeight: 700,
            fontSize: 12,
            textAlign: 'center',
            lineHeight: 1.15,
            px: 0.5,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {showImg ? (
            <Box
              component="img"
              key={iconUrl}
              src={iconUrl}
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
          {showBadge ? (
            <Box
              sx={{
                position: 'absolute',
                right: 2,
                bottom: 2,
                px: 0.5,
                borderRadius: 0.5,
                bgcolor: 'text.primary',
                color: 'background.paper',
                fontSize: 9,
                fontWeight: 700,
                lineHeight: 1.35,
              }}
            >
              {badge}
            </Box>
          ) : null}
        </Box>
        <Checkbox
          size="small"
          checked={checked}
          tabIndex={-1}
          disableRipple
          color={accent}
          sx={{ p: 0, '& .MuiSvgIcon-root': { fontSize: 18 } }}
        />
      </Box>
    </Tooltip>
  )
}
