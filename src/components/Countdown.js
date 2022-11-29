import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'
import { Box, Flex, Text } from 'theme-ui'

const Countdown = () => {
  const xmas = new Date('2022-12-25')
  const today = new Date()
  const offset = today.getTimezoneOffset() * 60000
  const diffTime = xmas.getTime() - today.getTime() + offset
  const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24))
  const text = `only ${diffDays} day${
    diffDays > 1 ? 's' : null
  } till DEC 25, hurry!`

  if (!diffDays) return null
  const MotionBox = motion(Flex)
  return (
    <AnimatePresence>
      <Box
        sx={{
          width: '100vw',
          maxWidth: '100%',
          height: 35,
          position: 'relative',
        }}
      >
        <MotionBox
          sx={{
            position: 'absolute',
            whiteSpace: 'nowrap',
          }}
          animate={{
            x: [0, -1035],
            transition: {
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 15,
                ease: 'linear',
              },
            },
          }}
        >
          {[...Array(20).keys()].map(k => (
            <Box
              key={`ticker-${k}`}
              sx={{
                bg: 'cream',
                fontSize: 1,
                fontWeight: 'bold',
                letterSpacing: 'wider',
              }}
              py={2}
            >
              •<Text px={4}>{text}</Text>
            </Box>
          ))}
        </MotionBox>
      </Box>
    </AnimatePresence>
  )
}

export default Countdown
