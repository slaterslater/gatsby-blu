import React, { useMemo } from 'react'
// import { GatsbyImage } from "gatsby-plugin-image";
import { Box, Flex, Text, Grid } from 'theme-ui'
import { Link } from 'gatsby'
import { useProductTitle } from '../hooks/product'
import { useFormattedPrice } from '../hooks/utils'
import RemoteShopifyImage from './RemoteShopifyImage'

const CollectionProduct = ({ product }) => {
  const fromPrice = useFormattedPrice({
    currency: product.priceRange.minVariantPrice.currencyCode,
    amount: product.priceRange.minVariantPrice.amount,
  })
  const title = useProductTitle(product.title)
  const firstImage = product.images[0]
  return (
    <Flex sx={{ flexDirection: 'column' }} as="article">
      <Box sx={{ flex: 1 }}>
        {/* <GatsbyImage */}
        {/*   image={product.images[0]?.localFile?.childImageSharp?.gatsbyImageData} */}
        {/* /> */}
        {firstImage && (
          <RemoteShopifyImage
            originalSrc={firstImage.originalSrc}
            altText={firstImage.altText}
          />
        )}
      </Box>
      <Box mt="auto" sx={{ height: 80 }} pt={2}>
        <Grid
          sx={{
            gridTemplateColumns: '1fr max-content',
            gap: 2,
            justifyContent: 'space-between',
          }}
        >
          <Text
            as="h6"
            variant="caps"
            sx={{
              color: '#454545',
            }}
          >
            <Link to={`/shop/products/${product.handle}`}>{title}</Link>
          </Text>
          <Text
            as="p"
            variant="caps"
            sx={{
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
}

export default CollectionProduct
