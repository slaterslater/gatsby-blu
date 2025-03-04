import { camelize } from 'inflected'
import { Box, Text } from 'theme-ui'
import React from 'react'

const MetalOptionSwatch = ({ metal, text, isCurrent }) => {
  const colour = camelize(metal.replace(' ', '_'), false)

  return (
    <Box
      sx={{
        borderRadius: '50%',
        border: '1px solid',
        borderColor: isCurrent ? '#c4c4c4' : 'transparent',
      }}
    >
      <Box
        sx={{
          bg: colour,
          height: 24,
          width: 24,
          border: '2px solid',
          borderColor: 'bbBeige',
          borderRadius: '50%',
        }}
      >
        {text && <Text 
          sx={{
            height: '100%',
            fontSize: '8px',
            display: 'flex',  
            justifyContent:'center',
            alignItems:'center',
            textTransform:'uppercase',
            lineHeight:0
          }}>{text}
        </Text>}
      </Box>
    </Box>
  )
}

export default MetalOptionSwatch
