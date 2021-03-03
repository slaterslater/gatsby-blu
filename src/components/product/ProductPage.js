import { Text, Flex, Box, Grid, Heading } from 'theme-ui'
import React, { useState } from 'react'
import { pluralize } from 'inflected'
import { useProductTitle } from '../ProductTitle'
import Breadcrumbs from '../Breadcrumbs'
import { useFormattedPrice } from '../../hooks/utils'

const ProductPage = ({
  product: { title, description, productType, variants },
}) => {
  const [selectedVariant, setSelectedVariant] = useState(variants[0])
  const productTitle = useProductTitle(title)
  const productPrice = useFormattedPrice({
    amount: selectedVariant.priceNumber,
    currency: 'CAD',
  })

  return (
    <Box p={4}>
      <Breadcrumbs
        currentPage={productTitle}
        links={[
          {
            path: '/',
            text: 'Home',
          },
          {
            path: `/shop/${pluralize(productType.toLowerCase())}`,
            text: pluralize(productType),
          },
        ]}
      />
      <Grid
        sx={{ gridTemplateColumns: ['1fr', '3fr 2fr'], columnGap: 5 }}
        pt={6}
      >
        <Box>images</Box>
        <Box>
          <Box
            pb={5}
            sx={{
              borderBottom: '1px solid',
              borderColor: 'border',
            }}
          >
            <Flex
              sx={{
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}
            >
              <Heading as="h1" sx={{ fontSize: 5 }} mr={4}>
                {productTitle}
              </Heading>
              <Text sx={{ whiteSpace: 'nowrap', fontSize: 3 }}>
                {productPrice}
              </Text>
            </Flex>
            reviews
          </Box>
          <Box>Related Colours</Box>
          <Box>Size Variants | link to size guide</Box>
          <Box>Add to Cart Button</Box>
          <Box>details</Box>
          <Box>description | link to collection</Box>
          <Box>model wearing thumbnails</Box>
        </Box>
      </Grid>
    </Box>
  )
}

export default ProductPage
