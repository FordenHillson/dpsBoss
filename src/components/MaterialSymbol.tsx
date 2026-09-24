import { Box, type BoxProps } from '@mui/material'

type MaterialSymbolProps = BoxProps & {
  name: string
  /** Optical size hint — matches Google Fonts Material Symbols */
  size?: number
  filled?: boolean
}

/**
 * Google Fonts Material Symbols Outlined
 * https://fonts.google.com/icons
 */
export function MaterialSymbol({
  name,
  size = 20,
  filled = false,
  sx,
  ...rest
}: MaterialSymbolProps) {
  return (
    <Box
      component="span"
      className="material-symbols-outlined"
      aria-hidden
      {...rest}
      sx={{
        fontFamily: '"Material Symbols Outlined"',
        fontWeight: 'normal',
        fontStyle: 'normal',
        fontSize: size,
        lineHeight: 1,
        letterSpacing: 'normal',
        textTransform: 'none',
        display: 'inline-block',
        whiteSpace: 'nowrap',
        wordWrap: 'normal',
        direction: 'ltr',
        WebkitFontFeatureSettings: "'liga'",
        WebkitFontSmoothing: 'antialiased',
        fontVariationSettings: filled
          ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
          : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
        userSelect: 'none',
        flexShrink: 0,
        ...sx,
      }}
    >
      {name}
    </Box>
  )
}
