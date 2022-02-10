import React from 'react'
import { Flex, Divider, Box, Heading, Grid } from 'theme-ui'

const CollectionProductGroup = ({ title, children, ...props }) => (
  <Box id={title} py={3} {...props}>
    {title && (
      <Flex py={2} sx={{ alignItems: 'center' }}>
        <Heading
          as="h3"
          mr={4}
          variant="caps"
          sx={{
            fontSize: 0,
          }}
        >
          {title.toLowerCase()}
        </Heading>
        <Divider sx={{ flex: 1 }} />
      </Flex>
    )}
    <Grid
      as="section"
      sx={{
        gap: 3,
        gridTemplateColumns: [
          'repeat(2, 1fr)',
          'repeat(2, 1fr)',
          'repeat(4, 1fr)',
        ],
      }}
      pt={4}
    >
      {children}
    </Grid>
  </Box>
)

export default CollectionProductGroup
