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
        height: 22,
        width: 22,
      }}
    >
      <Box
        sx={{
          bg: colour,
          height: 20,
          width: 20,
          border: '2px solid',
          borderColor: 'bbBeige',
          borderRadius: '50%',
        }}
      >
        {text && <Text 
          sx={{
            height: 16,
            fontSize:'6px',
            display: 'flex',  
            justifyContent:'center',
            alignItems:'center',
            textTransform:'uppercase'
          }}>{text}
        </Text>}
      </Box>
    </Box>
  )
}

export default MetalOptionSwatch
