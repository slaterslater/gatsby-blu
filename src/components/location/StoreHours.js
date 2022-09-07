import React from 'react'
import { Box, Flex, Heading, Text } from 'theme-ui'

const StoreHours = ({ daysOpen, isTempClosed }) => (
  <Flex
    sx={{
      flexDirection: 'column',
      width: '100%',
      maxWidth: 250,
      minHeight: [0, 0, 275],
    }}
    my={[6, 6, 5]}
    pr={[0, 4]}
    mx="auto"
  >
    <Heading
      as="h3"
      variant="h2"
      sx={{ fontSize: 3, textAlign: 'center' }}
      pb={[4, 2]}
    >
      hours
    </Heading>
    <Box
      as="ul"
      sx={{
        display: ['block', 'flex'],
        flexDirection: 'column',
        justifyContent: 'space-around',
        listStyleType: 'none',
        padding: 0,
        flex: 1,
        li: {
          paddingBottom: 2,
          display: 'flex',
          justifyContent: 'space-between',
        },
        span: {
          minWidth: 100,
          textAlign: 'center',
        },
      }}
    >
      {daysOpen.map(day => {
        const { name, isClosed, open, close } = day
        const time = t => {
          const [hh, mm] = t.split(':')
          return `${hh % 12 || 12}:${mm}${hh < 12 ? 'am' : 'pm'}`
        }
        return (
          <Text key={name} as="li">
            {name}
            <span>
              {isClosed || isTempClosed
                ? 'closed'
                : `${time(open)} - ${time(close)}`}
            </span>
          </Text>
        )
      })}
    </Box>
  </Flex>
)

export default StoreHours
