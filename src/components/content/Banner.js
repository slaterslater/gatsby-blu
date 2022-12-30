import React from 'react'
import { Box } from 'theme-ui'

const Banner = ({ height = 400, children, noMobile = false, ...props }) => (
  <Box
    sx={{
      flexDirection: 'column',
      justifyContent: 'stretch',
      '*': { flex: 1 },
      'div.mobile': { display: ['block', 'none'] },
      'div.desktop': { display: ['none', 'block'] },
      width: '100%',
      height,
      display: noMobile ? ['none', 'flex'] : 'flex',
    }}
    {...props}
  >
    {children}
  </Box>
)

export default Banner
