import React from 'react'
import { Box, Flex, Text, Grid } from 'theme-ui'

const ProductListItem = ({
  primaryImage,
  secondaryImage,
  title,
  fromPrice,
}) => (
  <Flex flexDirection="column" as="article">
    <Box flex="1">
      <Img fluid={product.images[0]?.localFile.childImageSharp.fluid} />
    </Box>
    <Box mt="auto" height={80} pt={2}>
      <Grid
        sx={{ gridTemplateColumns: '1fr max-content', gap: 2 }}
        justifyContent="space-between"
      >
        <Text
          as="h6"
          variant="caps"
          sx={{
            fontSize: 0,
            color: '#454545',
          }}
        >
          {title}
        </Text>
        <Text
          as="p"
          variant="caps"
          sx={{
            fontSize: 0,
            fontWeight: 500,
            color: '#454545',
          }}
        >
          {fromPrice}
        </Text>
      </Grid>
      {/* <div>metal variants</div> */}
    </Box>
  </Flex>
)

export default ProductListItem
