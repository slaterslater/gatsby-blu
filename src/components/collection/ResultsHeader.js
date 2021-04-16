import React from 'react'
import { Box, Flex, Heading, Text } from 'theme-ui'
import pluralize from 'pluralize'

const ResultsHeader = ({ title, description, count, resultType, children }) => (
  <Flex sx={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
    <Box sx={{ flex: 1 }} pr={4}>
      <Heading as="h1">{title}</Heading>
      {description && <Text>{description}</Text>}
    </Box>
    <Box>
      <Text variant="caps">{pluralize(resultType, count, true)}</Text>
      {children}
    </Box>
  </Flex>
)

export default ResultsHeader
