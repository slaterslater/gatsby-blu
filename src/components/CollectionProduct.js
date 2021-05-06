import React, { useContext, useMemo } from 'react'
import { Flex, Box, Text, Grid, Link, AspectRatio } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { motion } from 'framer-motion'
import { useProductTitle } from './ProductTitle'
import { useFormattedPrice } from '../hooks/utils'
import FluidShopifyImage from './FluidShopifyImage'
import { CurrencyContext } from '../contexts/CurrencyContext'

const MotionBox = motion(Box)

export const CollectionThumbnail = ({ primary, alternate }) => {
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

const useProductPrice = product => {
  const { currencyCode } = useContext(CurrencyContext)

  const hasRange =
    product.priceRange.minVariantPrice.amount !==
    product.priceRange.maxVariantPrice.amount
  // is there more than one price?
  //
  //

  const productPrice = useFormattedPrice({
    currency: product.priceRange.minVariantPrice.currencyCode,
    amount: product.priceRange.minVariantPrice.amount,
  })

  const minVariant = product.variants.find(
    variant =>
      variant.priceV2.currencyCode ===
        product.priceRange.minVariantPrice.currencyCode &&
      variant.priceV2.amount === product.priceRange.minVariantPrice.amount
  )

  const variantPresentmentPrice = minVariant.presentmentPrices.edges.find(
    ({ node }) => node.price.currencyCode === currencyCode
  )

  const minVariantPrice = useFormattedPrice({
    currency: variantPresentmentPrice?.node.price.currencyCode,
    amount: variantPresentmentPrice?.node.price.amount,
  })

  return [minVariantPrice || productPrice, hasRange]
}

const CollectionProduct = ({ product, images }) => {
  const [price, hasRange] = useProductPrice(product)
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
                color: 'darkerGray',
              }}
            >
              {title}
            </Text>
          </Box>
          <Flex pt={2} sx={{ justifyContent: 'center' }}>
            {hasRange && (
              <Text variant="caps" pr={1} sx={{ color: 'darkGray' }}>
                From
              </Text>
            )}
            <Text
              as="p"
              variant="caps"
              sx={{
                fontWeight: 500,
                color: '#454545',
              }}
            >
              {price}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  )
}

export default CollectionProduct
