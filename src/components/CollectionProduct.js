import React, { useMemo } from 'react'
import { Flex, Box, Text, Grid, Link, AspectRatio } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { motion } from 'framer-motion'
import { useProductTitle } from '../hooks/product'
import { useFormattedPrice } from '../hooks/utils'
import FluidShopifyImage from './FluidShopifyImage'

const MotionBox = motion(Box)

const CollectionThumbnail = ({ primary, alternate }) => {
  if (!primary && !alternate)
    return <AspectRatio sx={{ bg: 'cream' }} ratio={1 / 1} />

  return (
    <Grid>
      {primary && (
        <MotionBox
          sx={{ gridArea: '1 / 1 / -1 / -1', zIndex: 1 }}
          whileHover={{ opacity: alternate ? 0 : 1 }}
        >
          <FluidShopifyImage
            ratio={1 / 1}
            originalSrc={primary.originalSrc}
            altText={primary.altText}
          />
        </MotionBox>
      )}
      {alternate && (
        <Box sx={{ gridArea: '1 / 1 / -1 / -1' }}>
          <FluidShopifyImage
            ratio={1 / 1}
            originalSrc={alternate.originalSrc}
            altText={alternate.altText}
          />
        </Box>
      )}
    </Grid>
  )
}

const CollectionProduct = ({ product, images }) => {
  const fromPrice = useFormattedPrice({
    currency: product.priceRange.minVariantPrice.currencyCode,
    amount: product.priceRange.minVariantPrice.amount,
  })
  const title = useProductTitle(product.title)
  const firstImage = images[0]
  const secondImage = images[1]

  return (
    <Link
      as={GatsbyLink}
      to={`/products/${product.handle}`}
      sx={{ textDecoration: 'none' }}
    >
      <Flex sx={{ flexDirection: 'column' }} as="article">
        <CollectionThumbnail primary={firstImage} alternate={secondImage} />
        <Flex
          pt={2}
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
              {title}
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
          </Box>
        </Flex>
      </Flex>
    </Link>
  )
}

export default CollectionProduct
