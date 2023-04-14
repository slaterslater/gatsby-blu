import dayjs from 'dayjs'
import { motion, AnimatePresence } from 'framer-motion'
import React from 'react'
import { Box, Flex, Text } from 'theme-ui'

const Countdown = () => {
  const deadline = dayjs('2023-05-14')
  const days = deadline.diff(dayjs(), 'day')

  if (days < 1) return null

  const text = `celebrate a mama with a heart of gold - ${days} day${
    days > 1 ? 's' : ''
  } to go!`
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
