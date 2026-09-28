import { createTheme, type ThemeOptions } from '@mui/material/styles'

/**
 * Style UI v1.0 (Community) tokens from Figma Alerts / color styles.
 * https://www.figma.com/design/O4519BqmnXl7wDTShIBddO/Style-UI-v1.0--Community-
 */
export const styleUi = {
  sky: {
    200: '#9ED0FD',
    300: '#6DB1FA',
    700: '#073CAD',
  },
  gray: {
    100: '#F0F1F9',
    200: '#E2E4F3',
    300: '#C4C8DC',
    600: '#545778',
    700: '#393E64',
  },
  green: {
    200: '#E2F9AF',
    300: '#C8EF84',
    700: '#51921A',
  },
  yellow: {
    200: '#FFEE99',
    300: '#FFE266',
    700: '#B78300',
  },
  red: {
    200: '#FFBA99',
    300: '#FF8B66',
    700: '#B7000E',
  },
  radius: 8,
} as const

const shared: ThemeOptions = {
  typography: {
    fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
    body1: { fontSize: 16, lineHeight: '20px', fontWeight: 400 },
    body2: { fontSize: 14, lineHeight: '20px', fontWeight: 400 },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  shape: { borderRadius: styleUi.radius },
  spacing: 8,
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => {
        const dark = theme.palette.mode === 'dark'
        const thumb = dark ? styleUi.gray[600] : styleUi.gray[300]
        const thumbHover = dark ? styleUi.gray[300] : styleUi.gray[600]
        const track = dark ? 'rgba(0, 0, 0, 0.25)' : styleUi.gray[100]
        return {
          body: {
            transition: 'background-color 200ms ease, color 200ms ease',
          },
          /* Style UI–toned scrollbars (WebKit + Firefox) */
          '*': {
            scrollbarWidth: 'thin',
            scrollbarColor: `${thumb} ${track}`,
          },
          '*::-webkit-scrollbar': {
            width: 8,
            height: 8,
          },
          '*::-webkit-scrollbar-track': {
            background: track,
            borderRadius: 4,
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: thumb,
            borderRadius: 4,
            border: '2px solid transparent',
            backgroundClip: 'content-box',
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: thumbHover,
            border: '1px solid transparent',
            backgroundClip: 'content-box',
          },
        }
      },
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid',
        },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0, color: 'default' },
      styleOverrides: {
        root: {
          borderBottom: '1px solid',
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: styleUi.radius },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
        slotProps: {
          inputLabel: { shrink: true },
        },
      },
    },
    MuiInputLabel: {
      defaultProps: { shrink: true },
      styleOverrides: {
        root: ({ theme }) => ({
          position: 'relative',
          transform: 'none',
          fontSize: 14,
          lineHeight: '20px',
          fontWeight: 400,
          marginBottom: 6,
          maxWidth: '100%',
          color: theme.palette.text.secondary,
          '&.Mui-focused': {
            color: theme.palette.text.secondary,
          },
          '&.Mui-error': {
            color: theme.palette.error.main,
          },
          '&.MuiInputLabel-shrink': {
            transform: 'none',
          },
        }),
        shrink: {
          transform: 'none',
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginLeft: 0,
          marginRight: 0,
          marginTop: 6,
          fontSize: 12,
          lineHeight: '16px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: styleUi.radius,
          backgroundColor: 'transparent',
          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: 1,
            borderColor: theme.palette.divider,
          },
          '&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error) .MuiOutlinedInput-notchedOutline':
            {
              borderColor:
                theme.palette.mode === 'dark'
                  ? styleUi.gray[300]
                  : styleUi.gray[600],
            },
          /* Filled (has value) — slightly stronger border like Style UI "Typed" */
          '&:has(input:not(:placeholder-shown)):not(.Mui-focused):not(.Mui-error):not(.Mui-disabled) .MuiOutlinedInput-notchedOutline':
            {
              borderColor:
                theme.palette.mode === 'dark'
                  ? styleUi.gray[300]
                  : styleUi.gray[700],
            },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: 1.5,
            borderColor: theme.palette.primary.main,
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.error.main,
          },
          '&.Mui-disabled': {
            backgroundColor:
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.06)'
                : styleUi.gray[100],
          },
          '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.divider,
          },
          /* End adornment (e.g. visibility icon) follows focus / error */
          '&.Mui-focused .MuiInputAdornment-root': {
            color: theme.palette.primary.main,
          },
          '&.Mui-error .MuiInputAdornment-root': {
            color: theme.palette.error.main,
          },
        }),
        notchedOutline: {
          '& legend': {
            width: 0,
            padding: 0,
            maxWidth: 0,
          },
        },
        input: ({ theme }) => ({
          padding: '8px 12px',
          fontSize: 14,
          lineHeight: '20px',
          height: 'auto',
          '&::placeholder': {
            opacity: 1,
            color: theme.palette.text.secondary,
          },
        }),
        adornedEnd: {
          paddingRight: 10,
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.secondary,
        }),
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: { borderRadius: styleUi.radius, border: '1px solid' },
        colorSuccess: {
          backgroundColor: styleUi.green[200],
          borderColor: styleUi.green[300],
          color: styleUi.green[700],
        },
        colorWarning: {
          backgroundColor: styleUi.yellow[200],
          borderColor: styleUi.yellow[300],
          color: styleUi.yellow[700],
        },
        colorError: {
          backgroundColor: styleUi.red[200],
          borderColor: styleUi.red[300],
          color: styleUi.red[700],
        },
        colorInfo: {
          backgroundColor: styleUi.sky[200],
          borderColor: styleUi.sky[300],
          color: styleUi.sky[700],
        },
      },
    },
  },
}

export function createAppTheme(mode: 'light' | 'dark') {
  if (mode === 'light') {
    return createTheme({
      ...shared,
      palette: {
        mode: 'light',
        primary: {
          main: styleUi.sky[700],
          light: styleUi.sky[200],
          dark: styleUi.sky[700],
          contrastText: '#FFFFFF',
        },
        secondary: {
          main: styleUi.gray[600],
          light: styleUi.gray[200],
          contrastText: '#FFFFFF',
        },
        error: {
          main: styleUi.red[700],
          light: styleUi.red[200],
        },
        warning: {
          main: styleUi.yellow[700],
          light: styleUi.yellow[200],
        },
        success: {
          main: styleUi.green[700],
          light: styleUi.green[200],
        },
        info: {
          main: styleUi.sky[700],
          light: styleUi.sky[200],
        },
        background: {
          default: styleUi.gray[100],
          paper: '#FFFFFF',
        },
        text: {
          primary: styleUi.gray[700],
          secondary: styleUi.gray[600],
        },
        divider: styleUi.gray[300],
        action: {
          hover: 'rgba(7, 60, 173, 0.04)',
          selected: 'rgba(158, 208, 253, 0.45)',
        },
      },
      components: {
        ...shared.components,
        MuiPaper: {
          ...shared.components?.MuiPaper,
          styleOverrides: {
            root: {
              backgroundImage: 'none',
              border: `1px solid ${styleUi.gray[300]}`,
            },
          },
        },
        MuiAppBar: {
          ...shared.components?.MuiAppBar,
          styleOverrides: {
            root: {
              borderBottom: `1px solid ${styleUi.gray[300]}`,
              backgroundColor: '#FFFFFF',
              color: styleUi.gray[700],
              backgroundImage: 'none',
            },
          },
        },
      },
    })
  }

  return createTheme({
    ...shared,
    palette: {
      mode: 'dark',
      primary: {
        main: styleUi.sky[300],
        light: styleUi.sky[200],
        dark: styleUi.sky[700],
        contrastText: styleUi.gray[700],
      },
      secondary: {
        main: styleUi.gray[200],
        contrastText: styleUi.gray[700],
      },
      error: {
        main: styleUi.red[300],
        light: styleUi.red[200],
      },
      warning: {
        main: styleUi.yellow[300],
        light: styleUi.yellow[200],
      },
      success: {
        main: styleUi.green[300],
        light: styleUi.green[200],
      },
      info: {
        main: styleUi.sky[300],
        light: styleUi.sky[200],
      },
      background: {
        default: '#2A2E4A',
        paper: styleUi.gray[700],
      },
      text: {
        primary: styleUi.gray[200],
        secondary: styleUi.gray[300],
      },
      divider: styleUi.gray[600],
      action: {
        hover: 'rgba(158, 208, 253, 0.08)',
        selected: 'rgba(109, 177, 250, 0.22)',
      },
    },
    components: {
      ...shared.components,
      MuiPaper: {
        ...shared.components?.MuiPaper,
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            border: `1px solid ${styleUi.gray[600]}`,
          },
        },
      },
      MuiAppBar: {
        ...shared.components?.MuiAppBar,
        styleOverrides: {
          root: {
            borderBottom: `1px solid ${styleUi.gray[600]}`,
            backgroundColor: styleUi.gray[700],
            color: styleUi.gray[200],
            backgroundImage: 'none',
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: { borderRadius: styleUi.radius, border: '1px solid' },
          colorSuccess: {
            backgroundColor: styleUi.green[200],
            borderColor: styleUi.green[300],
            color: styleUi.green[700],
          },
          colorWarning: {
            backgroundColor: styleUi.yellow[200],
            borderColor: styleUi.yellow[300],
            color: styleUi.yellow[700],
          },
          colorError: {
            backgroundColor: styleUi.red[200],
            borderColor: styleUi.red[300],
            color: styleUi.red[700],
          },
          colorInfo: {
            backgroundColor: styleUi.sky[200],
            borderColor: styleUi.sky[300],
            color: styleUi.sky[700],
          },
        },
      },
    },
  })
}

/** @deprecated use createAppTheme */
export const theme = createAppTheme('light')
