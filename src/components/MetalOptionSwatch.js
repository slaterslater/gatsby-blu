import { camelize, underscore } from 'inflected'
import { Box } from 'theme-ui'
import React from 'react'

const MetalOptionSwatch = ({ metal, isCurrent }) => {
  const colour = camelize(metal.replace(' ', '_'), false)

  return (
    <Box
      sx={{
        borderRadius: '50%',
        border: '1px solid',
        borderColor: isCurrent ? colour : 'transparent',
      }}
    >
      <Box
        sx={{
          bg: colour,
          height: 26,
          width: 26,
          border: '4px solid',
          borderColor: 'white',
          borderRadius: '50%',
        }}
      />
    </Box>
  )
}

export default MetalOptionSwatch
