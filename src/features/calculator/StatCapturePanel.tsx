import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import type { CapturedStats } from '../../domain/types'
import { parseStatSnapshot } from '../statCapture/parseStatSnapshot'
import { STAT_CAPTURE_PROMPT } from '../statCapture/prompt'

interface StatCapturePanelProps {
  onApply: (patch: Partial<CapturedStats>, missing: string[]) => void
  onNotify: (message: string, severity: 'success' | 'warning' | 'error' | 'info') => void
}

export function StatCapturePanel({ onApply, onNotify }: StatCapturePanelProps) {
  const [jsonText, setJsonText] = useState('')

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(STAT_CAPTURE_PROMPT)
      onNotify('คัดลอก prompt แล้ว', 'success')
    } catch {
      onNotify('คัดลอกไม่สำเร็จ', 'error')
    }
  }

  const handleApply = () => {
    const result = parseStatSnapshot(jsonText)
    if (result.error && Object.keys(result.data).length === 0) {
      onNotify(result.error, 'error')
      return
    }
    onApply(result.data, result.missing)
    if (result.ok) {
      onNotify('นำเข้า JSON แล้ว', 'success')
    } else if (Object.keys(result.data).length > 0) {
      onNotify(`ขาดฟิลด์: ${result.missing.join(', ')}`, 'warning')
    } else {
      onNotify(result.error ?? 'นำเข้าไม่สำเร็จ', 'error')
    }
  }

  return (
    <Accordion
      disableGutters
      elevation={0}
      defaultExpanded={false}
      sx={{
        bgcolor: 'transparent',
        '&:before': { display: 'none' },
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ minHeight: 40 }}>
        <Typography variant="subtitle2">นำเข้า JSON</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0 }}>
        <Stack spacing={1.5}>
          <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: 'wrap' }}>
            <Button
              size="small"
              variant="text"
              startIcon={<ContentCopyIcon fontSize="small" />}
              onClick={handleCopyPrompt}
            >
              Copy prompt
            </Button>
            <Button size="small" variant="outlined" onClick={handleApply}>
              Apply
            </Button>
          </Stack>
          <TextField
            label="JSON"
            multiline
            minRows={3}
            maxRows={8}
            fullWidth
            size="small"
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
          />
        </Stack>
      </AccordionDetails>
    </Accordion>
  )
}
