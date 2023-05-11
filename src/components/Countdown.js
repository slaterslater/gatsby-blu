import dayjs from 'dayjs'
import { motion, AnimatePresence } from 'framer-motion'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { Box, Flex, Text } from 'theme-ui'

const Countdown = () => {
  const data = useStaticQuery(graphql`
    {
      sanitySiteAnnouncements {
        countdown {
          text
          startDate
          stopDate
        }
      }
    }
  `)

  const { text, startDate, stopDate } = data.sanitySiteAnnouncements.countdown
  if (!(text && startDate && stopDate)) return null

  const tooEarly = dayjs().isBefore(startDate, 'day')
  const difference = dayjs(stopDate).diff(dayjs(), 'day', true)
  const days = Math.ceil(difference)

  if (days < 1 || tooEarly) return null

  const message = text.replace('#days', `${days} day${days > 1 ? 's' : ''}`)
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
                // span: { textTransform: 'uppercase' },
              }}
              py={2}
            >
              •<Text px={4}>{message}</Text>
            </Box>
          ))}
        </MotionBox>
      </Box>
    </AnimatePresence>
  )
}

export default Countdown
