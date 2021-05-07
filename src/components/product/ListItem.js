import React from 'react'
import { Flex, Box, Text, Link } from 'theme-ui'
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

const ProductListItem = ({
  to,
  firstImage,
  secondImage,
  title,
  hasRange,
  price,
}) => (
  <Link as={GatsbyLink} to={to} sx={{ textDecoration: 'none' }}>
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

export default ProductListItem
