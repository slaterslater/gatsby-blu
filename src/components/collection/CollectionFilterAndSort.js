import React, { useState } from 'react'
import { Grid, Box, Text, Checkbox } from 'theme-ui'
import { useLocation } from '@reach/router'

const CollectionFilterAndSort = ({ isOpen }) => {
  const location = useLocation()

  return (
    <Grid>
      <Box>
        <Text>Sort</Text>
      </Box>
    </Grid>
  )
}

export default CollectionFilterAndSort
