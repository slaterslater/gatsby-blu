import React from 'react'
import { pluralize } from 'inflected'
import { Box, Text, Grid } from 'theme-ui'

const CollectionProductGroup = ({ groupType, children }) => {
  const title = pluralize(groupType)

  return (
    <Box id={groupType} py={2}>
      <Box pb={2} sx={{ borderBottom: '1px solid', borderColor: '#e5e5e5' }}>
        <Text
          as="h3"
          variant="caps"
          sx={{
            fontSize: 3,
          }}
        >
          {title}
        </Text>
      </Box>
      <Grid
        as="section"
        sx={{
          gap: 5,
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        }}
        pt={4}
      >
        {children}
      </Grid>
    </Box>
  )
}

export default CollectionProductGroup
