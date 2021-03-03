import { camelize, underscore } from 'inflected'
import { Box } from 'theme-ui'
import React from 'react'

const MetalOptionSwatch = ({ metal }) => {
  const colour = camelize(metal.replace(' ', '_'), false)

  return (
    <Box
      sx={{
        bg: colour,
        height: 26,
        width: 26,
        border: '4px solid',
        borderColor: 'white',
        borderRadius: '50%',
        boxShadow: 'medium',
      }}
    />
  )
}

export default MetalOptionSwatch
