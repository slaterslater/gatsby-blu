import React from 'react'
import { Grid, Box, Text } from 'theme-ui'

const CollectionFilterAndSort = ({ isOpen }) => {
  if (!isOpen) return false
  return (
    <Grid>
      <Box>
        <Text variant="caps">Filter</Text>
      </Box>
    </Grid>
  )
}

export default CollectionFilterAndSort
