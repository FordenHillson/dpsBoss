import { Box, Typography } from '@mui/material'
import type { ReactNode } from 'react'

interface BuffGroupSectionProps {
  title: string
  children: ReactNode
}

/** Category header + equal-width card row (2-up grid). */
export function BuffGroupSection({ title, children }: BuffGroupSectionProps) {
  return (
    <Box>
      <Typography
        variant="caption"
        sx={{
          display: 'block',
          mb: 0.5,
          fontWeight: 700,
          letterSpacing: 0.4,
          color: 'text.secondary',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, minmax(0, 1fr))',
          },
          gap: 0.75,
        }}
      >
        {children}
      </Box>
    </Box>
  )
}
