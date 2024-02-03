import { createTheme, lighten } from '@mui/material'

import baseComponent, { baseColors, baseTheme } from './base'

const darkTheme = createTheme(
  {
    palette: {
      mode: 'dark',
    },
  },
  baseTheme,
  {
    palette: {
      background: {
        default: '#141516',
        paper: '#292B2D',
      },
    },
    components: {
      ...baseComponent,
    },
    typography: {
      signinTitle: {
        color: '#3B8AFF',
      },
      authorCustomTitle: {
        color: lighten(baseColors.authorCustomTitle, 0.3),
      },
      authorGroupTitle: {
        color: lighten(baseColors.authorGroupTitle, 0.9),
      },
      authorGroupTitlePrompt: {
        color: lighten(baseColors.authorGroupTitlePrompt, 0.2),
      },
      authorGroupSubtitle: {
        color: lighten(baseColors.authorGroupSubtitle, 0.3),
      },
      userCardName: {
        color: '#ffffff',
      },
    },
  }
)
console.log(darkTheme)

export default darkTheme
