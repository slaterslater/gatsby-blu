import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'
import { Box, Flex, Text } from 'theme-ui'

const Countdown = () => {
  const end = new Date('2023-02-10')
  const now = new Date()
  const offset = now.getTimezoneOffset() * 60000
  const diffTime = end.getTime() - now.getTime() + offset
  const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24))

  if (diffDays < 1) return null

  // const text = `only ${diffDays} day${
  //   diffDays > 1 ? 's' : ''
  // } till DEC 25, hurry!`

  const text =
    "order by February 10th to receive engraving on us - just in time for valentine's day"

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
                duration: 50,
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
                span: { textTransform: 'uppercase' },
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
