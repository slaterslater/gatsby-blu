import { Box, Text, Heading } from 'theme-ui'
import React from 'react'

const CollectionPageHeader = ({ title, description }) => (
  <Box sx={{ bg: 'gray' }} p={5}>
    <Text as="h1" variant="caps">
      {title}
    </Text>
    <Heading as="h2">{description}</Heading>
  </Box>
)

export default CollectionPageHeader
