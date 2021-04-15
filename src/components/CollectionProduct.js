import React, { useMemo } from 'react'
import { Flex, Box, Text, Grid, Link } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { useProductTitle } from '../hooks/product'
import { useFormattedPrice } from '../hooks/utils'
import FluidShopifyImage from './FluidShopifyImage'

const CollectionProduct = ({ product }) => {
  const fromPrice = useFormattedPrice({
    currency: product.priceRange.minVariantPrice.currencyCode,
    amount: product.priceRange.minVariantPrice.amount,
  })
  const title = useProductTitle(product.title)
  const firstImage = product.images[0]

  return (
    <Flex sx={{ flexDirection: 'column' }} as="article">
      <Box>
        {/* <GatsbyImage */}
        {/*   image={product.images[0]?.localFile?.childImageSharp?.gatsbyImageData} */}
        {/* /> */}
        {firstImage && (
          <FluidShopifyImage
            ratio={1 / 1}
            originalSrc={firstImage.originalSrc}
            altText={firstImage.altText}
          />
        )}
      </Box>
      <Flex
        sx={{ flex: 1, flexDirection: 'column', alignItems: 'space-between' }}
      >
        <Box mb="auto" sx={{ alignSelf: 'top', textAlign: 'center' }}>
          <Text
            as="h6"
            variant="caps"
            sx={{
              color: '#454545',
            }}
          >
            <Link
              as={GatsbyLink}
              to={`/products/${product.handle}`}
              sx={{ textDecoration: 'none' }}
            >
              {title}
            </Link>
          </Text>
        </Box>
        <Box pt={1} sx={{ textAlign: 'center' }}>
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
          {/* <div>metal variants</div> */}
        </Box>
      </Flex>
    </Flex>
  )
}

export default CollectionProduct
