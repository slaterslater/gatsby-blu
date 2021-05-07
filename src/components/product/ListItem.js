import React from 'react'
import { AspectRatio, Grid, Flex, Box, Text, Link, Badge } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
// import { CollectionThumbnail } from '../CollectionProduct'
import { motion } from 'framer-motion'
import FluidShopifyImage from '../FluidShopifyImage'

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

const ProductItemLabel = ({ tags, soldOut }) => {
  if (soldOut)
    return (
      <Badge
        sx={{ bg: 'cream', position: 'absolute', top: 1, left: 1, zIndex: 10 }}
      >
        Sold Out
      </Badge>
    )

  const label = tags.find(el => el.includes('__label'))
  const labelText = label ? label.replace('__label:', '') : null
  if (label)
    return (
      <Badge
        sx={{ bg: 'cream', position: 'absolute', top: 1, left: 1, zIndex: 10 }}
      >
        {labelText}
      </Badge>
    )

  return null
}

const ProductListItem = ({
  to,
  firstImage,
  secondImage,
  title,
  hasRange,
  price,
  tags,
  availableForSale,
}) => (
  <Link
    as={GatsbyLink}
    to={to}
    sx={{ textDecoration: 'none', position: 'relative' }}
  >
    <ProductItemLabel tags={tags} soldOut={!availableForSale} />
    <Flex sx={{ flexDirection: 'column', position: 'relative' }} as="article">
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

export default ProductListItem
