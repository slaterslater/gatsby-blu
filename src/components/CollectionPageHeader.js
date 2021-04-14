import { Grid, Box, Text, Heading } from 'theme-ui'
import React from 'react'

const CollectionPageHeader = ({ title, description, ...props }) => (
  <Grid
    sx={{ bg: 'lightBlueGray', gridTemplateColumns: '1fr' }}
    p={6}
    {...props}
  >
    <Box sx={{ textAlign: 'center' }}>
      <Text as="h1" variant="caps" pb={3}>
        {title}
      </Text>
      <Heading as="h2" sx={{ lineHeight: 'body' }}>
        {description}
      </Heading>
    </Box>
  </Grid>
)

export default CollectionPageHeader
