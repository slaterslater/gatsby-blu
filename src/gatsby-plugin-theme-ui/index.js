const sketchButton = {
  '&:disabled': {
    opacity: 0.5,
  },
  '&:hover': {
    '&::before': {
      transform: 'rotate(1deg)',
      transition: 'transform 200ms ease',
    },
  },
  lineHeight: '1.5em',
  backgroundColor: 'transparent',
  color: 'white',
  textTransform: 'uppercase',
  height: 66,
  width: 221,
  textAlign: 'center',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 0,
  fontWeight: 'heading',
  letterSpacing: 'widest',
  position: 'relative',
  zIndex: 1,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: -1,
    backgroundColor: 'transparent',
    backgroundSize: '100%',
  },
}

const colors = {
  black: '#14191F',
  navy: '#14191F',
  darkGray: '#7D7D7D',
  darkerGray: '#454545',
  gray: '#BDC2BF',
  border: '#e5e5e5',
  darkBorder: '#858585',
  lightGray: '#e4e7ea',
  lightBlueGray: '#ced6df',
  blueGray: '#7b92a3',
  cream: '#ECE7E1',
  bbBeige: '#F7F4EF',
  white: '#FFFFFF',
  yellowGold: '#e9d68f',
  sterlingSilver: '#c7c7c7',
  roseGold: '#e0c5ae',
  error: '#f8382a',
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
  fontSizes: [10, 12, 14, 16, 20, 24, 32, 48, 64],
  fontWeights: {
    light: 300,
    body: 400,
    heading: 500,
    bold: 700,
  },
  lineHeights: {
    body: 2.5,
    heading: 1.125,
    small: 1.2,
  },
  letterSpacings: {
    body: 'normal',
    wider: '0.1em',
    widest: '0.2em',
    caps: '0.2em',
  },
  space: [0, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 256, 512],
  links: {
    sketcButtonhWhite: {
      ...sketchButton,
      textDecoration: 'none',
      '&::before': {
        ...sketchButton['&::before'],
        backgroundImage: 'url("/button_white.png")',
      },
    },
    sketchButtonBlack: {
      ...sketchButton,
      textDecoration: 'none',
      color: 'black',
      '&::before': {
        ...sketchButton['&::before'],
        backgroundImage: 'url("/button_black.png")',
      },
    },
    small: {
      fontSize: 0,
      textDecoration: 'none',
      color: 'inherit',
      letterSpacing: 'wider',
      textTransform: 'lowercase',
      '&:hover': { textDecoration: 'underline' },
    },
    caps: {
      textDecoration: 'none',
      fontFamily: 'body',
      textTransform: 'uppercase',
      letterSpacing: 'widest',
      color: 'inherit',
      fontSize: 0,
    },
    nav: {
      fontFamily: 'body',
      letterSpacing: 'wide',
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
      letterSpacing: 'wider',
      lineHeight: 'body',
    },
    caps: {
      textTransform: 'uppercase',
      letterSpacing: 'widest',
      fontFamily: 'body',
      fontWeight: 500,
      fontSize: 0,
    },
    looseSans: {
      fontFamily: 'body',
      fontWeight: 'heading',
      letterSpacing: 'widest',
    },
    copy: {
      fontSize: 1,
      fontFamily: 'body',
      letterSpacing: 'wider',
      lineHeight: '2.5em',
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
    h1: {
      textTransform: 'uppercase',
      letterSpacing: 'widest',
      fontWeight: 'body',
      fontFamily: 'heading',
    },
    small: {
      fontSize: 0,
      letterSpacing: 'normal',
      lineHeight: '1.2em',
    },
  },
  buttons: {
    sketchWhite: {
      ...sketchButton,
      '&::before': {
        ...sketchButton['&::before'],
        backgroundImage: 'url("/button_white.png")',
      },
    },
    sketchBlack: {
      ...sketchButton,
      '&::before': {
        ...sketchButton['&::before'],
        backgroundImage: 'url("/button_black.png")',
      },
    },
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
      transition: 'opacity ease-out .176s',
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
    outline: {
      '&:disabled': {
        opacity: 0.5,
      },
      border: '1px solid',
      borderColor: 'primary',
      borderRadius: 0,
      bg: 'white',
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
    label: {
      fontSize: 1,
      color: 'darkGray',
    },
    input: {
      fontSize: 1,
      borderRadius: 0,
      borderColor: 'border',
      py: 3,
      '&:focus': {
        borderColor: 'darkBorder',
      },
    },
    bigSearch: {
      fontSize: 3,
      textTransform: 'uppercase',
      fontFamily: 'body',
      border: 'none',
      letterSpacing: 'caps',
      '&::placeholder': {
        color: 'darkGray',
      },
    },
    select: {
      fontSize: 1,
      borderRadius: 0,
      borderColor: 'border',
      py: 3,
      '&:focus': {
        borderColor: 'darkBorder',
      },
    },
    textarea: {
      fontSize: 1,
      fontFamily: 'body',
      borderRadius: 0,
      borderColor: 'border',
      py: 3,
      '&:focus': {
        borderColor: 'darkBorder',
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
    full: {
      maxWidth: '100%',
      px: 0,
      pb: [5, 6, 7, 8],
    },
    wide: {
      maxWidth: 1444,
      px: [5, 6, 7, 8],
      pb: [5, 6, 7, 8],
    },
    medium: {
      maxWidth: 840,
      px: [5, 6, 7, 8],
      pb: [5, 6, 7, 8],
    },
    narrow: {
      maxWidth: 635,
      px: [5, 6, 7, 8],
      pb: [5, 6, 7, 8],
    },
  },
  badges: {
    primary: {
      bg: 'cream',
      color: 'primary',
      borderRadius: 0,
      textTransform: 'uppercase',
      letterSpacing: 'caps',
      fontWeight: 'body',
      fontSize: 10,
      py: 1,
      px: 2,
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
      textDecoration: 'underline',
    },
    hr: {
      borderBottom: '1px solid',
      borderColor: 'border',
    },
    h3: {
      fontFamily: 'body',
      textTransform: 'uppercase',
      letterSpacing: 'caps',
      fontWeight: 400,
    },
  },
}
