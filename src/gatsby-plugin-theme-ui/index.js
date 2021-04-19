const colors = {
  black: '#040404',
  navy: '#040404',
  darkGray: '#7D7D7D',
  darkerGray: '#454545',
  gray: '#BDC2BF',
  lightGray: '#e4e7ea',
  lightBlueGray: '#ced6df',
  blueGray: '#7b92a3',
  cream: '#EEE9E3',
  white: '#FFFFFF',
  yellowGold: '#e9d68f',
  sterlingSilver: '#c7c7c7',
  roseGold: '#e0c5ae',
}
colors.text = colors.black
colors.primary = colors.navy
colors.background = colors.white
colors.border = colors.lightGray

export default {
  colors,
  fonts: {
    body:
      '"Montserrat", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: '"Sorts Mill Goudy", Georgia, serif',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [11, 12, 14, 16, 20, 24, 32, 48, 64],
  fontWeights: {
    light: 300,
    body: 400,
    heading: 500,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    eading: 1.125,
  },
  letterSpacings: {
    body: 'normal',
    wider: '.1em',
    caps: '0.2em',
  },
  space: [0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 256, 512],
  links: {
    nav: {
      textDecoration: 'none',
      color: 'inherit',
      cursor: 'pointer',
    },
  },
  alerts: {
    empty: {
      bg: 'border',
      color: 'darkGray',
      justifyContent: 'center',
      py: 5,
    },
  },
  text: {
    default: {
      fontSize: 1,
    },
    caps: {
      textTransform: 'uppercase',
      letterSpacing: '0.2em',
      fontFamily: 'body',
      fontWeight: 'body',
      fontSize: 0,
    },
    lightCaps: {
      textTransform: 'uppercase',
      letterSpacing: '0.2em',
      fontWeight: 'light',
      fontFamily: 'body',
    },
    strike: {
      textDecoration: 'line-through',
    },
  },
  buttons: {
    primary: {
      '&:disabled': {
        opacity: 0.5,
      },
      borderRadius: 0,
      py: 3,
      px: 4,
      fontSize: 0,
      fontFamily: 'body',
      fontWeight: 'heading',
      textTransform: 'uppercase',
      letterSpacing: '.1em',
      cursor: 'pointer',
    },
    secondary: {
      '&:disabled': {
        opacity: 0.5,
      },
      borderRadius: 0,
      py: 3,
      px: 4,
      fontSize: 0,
      fontFamily: 'body',
      fontWeight: 'heading',
      textTransform: 'uppercase',
      letterSpacing: '.1em',
      cursor: 'pointer',
      bg: 'white',
      color: 'primary',
    },
    inverted: {
      border: '1px solid',
      borderColor: 'cream',
      borderRadius: 0,
      bg: 'cream',
      color: 'primary',
      py: 3,
      px: 4,
      fontSize: 0,
      fontFamily: 'body',
      fontWeight: 'heading',
      textTransform: 'uppercase',
      letterSpacing: '.1em',
      cursor: 'pointer',
    },
    unset: {
      all: 'unset',
    },
  },
  forms: {
    inverted: {
      border: '1px solid',
      borderColor: 'cream',
      borderRadius: 0,
      color: 'cream',
      p: 3,
      fontSize: 1,
      fontFamily: 'body',
      '&::placeholder': {
        color: 'gray',
        fontSize: 0,
      },
    },
  },
  variants: {
    sectionWrap: {
      py: 6,
      px: [5, 6, 6, 7],
    },
  },
  layout: {
    container: {
      maxWidth: 1444,
      py: 6,
      px: [5, 6, 6, 7],
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      webkitFontSmoothing: 'antialiased',
      mozOsxFontSmoothing: 'grayscale',
      wordWrap: 'break-word',
      fontKerning: 'normal',
      mozFontFeatureSettings: "'kern', 'liga', 'clig', 'calt'",
      msFontFeatureSettings: "'kern', 'liga', 'clig', 'calt'",
      webkitFontFeatureSettings: "'kern', 'liga', 'clig', 'calt'",
      fontFeatureSettings: "'kern', 'liga', 'clig', 'calt'",
    },
    a: {
      color: 'inherit',
    },
    hr: {
      borderBottom: '1px solid',
      borderColor: 'border',
    },
  },
}
