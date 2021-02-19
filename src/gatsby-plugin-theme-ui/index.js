const colors = {
  black: '#040404',
  navy: '#040404',
  border: '#e3e3e3',
  gray: '#BDC2BF',
  cream: '#EEE9E3',
  white: '#FFFFFF',
}
colors.text = colors.black
colors.primary = colors.navy
colors.background = colors.white

export default {
  colors,
  fonts: {
    body:
      '"Montserrat", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: '"Sorts Mill Goudy", Georgia, serif',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  fontWeights: {
    light: 300,
    body: 400,
    heading: 500,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  letterSpacings: {
    body: 'normal',
    wider: '.1em',
    caps: '0.2em',
  },
  space: [0, 4, 8, 12, 16, 24, 32, 64, 96, 128, 256, 512],
  text: {
    caps: {
      textTransform: 'uppercase',
      letterSpacing: '0.2em',
    },
  },
  buttons: {
    primary: {
      borderRadius: 0,
      py: 3,
      px: 4,
      fontSize: 1,
      fontFamily: 'body',
      fontWeight: 'heading',
      textTransform: 'uppercase',
      letterSpacing: '.1em',
      cursor: 'pointer',
    },
    inverted: {
      border: '1px solid',
      borderColor: 'cream',
      borderRadius: 0,
      bg: 'cream',
      color: 'primary',
      py: 3,
      px: 4,
      fontSize: 1,
      fontFamily: 'body',
      fontWeight: 'heading',
      textTransform: 'uppercase',
      letterSpacing: '.1em',
      cursor: 'pointer',
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
  styles: {
    root: {
      fontFamily: 'body',
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      'word-wrap': 'break-word',
      'font-kerning': 'normal',
      '-moz-font-feature-settings': "'kern', 'liga', 'clig', 'calt'",
      '-ms-font-feature-settings': "'kern', 'liga', 'clig', 'calt'",
      '-webkit-font-feature-settings': "'kern', 'liga', 'clig', 'calt'",
      'font-feature-settings': "'kern', 'liga', 'clig', 'calt'",
    },
  },
}
