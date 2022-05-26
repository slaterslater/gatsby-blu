import React from 'react'
import { Box, Flex, Heading, Text } from 'theme-ui'

const StoriesHeader = ({ title, description, children }) => (
  <Flex
    mx="auto"
    sx={{
      bg: 'bbBeige',
      width: '100%',
      flexDirection: ['column-reverse', 'row'],
      alignItems: 'stretch',
    }}
  >
    <Flex
      sx={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 250,
      }}
    >
      <Box
        py={7}
        sx={{
          textAlign: 'center',
          width: '100%',
          maxWidth: 375,
          mx: 'auto',
        }}
      >
        <Heading variant="h2" as="h1" sx={{ textTransform: 'lowercase' }}>
          {title}
        </Heading>
        <Text
          as="p"
          mx="auto"
          mt={5}
          px={[4, 0]}
          sx={{
            display: 'block',
            fontSize: 1,
            lineHeight: 'body',
            letterSpacing: 'wider',
            maxWidth: 375,
            textAlign: 'center',
          }}
        >
          {description}
        </Text>
      </Box>
    </Flex>
    <Flex sx={{ width: ['100%', '50%'], height: 375 }}>{children}</Flex>
  </Flex>
)

export default StoriesHeader
