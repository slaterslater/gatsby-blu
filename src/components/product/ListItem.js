import React from 'react'
import { Flex, Box, Text, Link } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { CollectionThumbnail } from '../CollectionProduct'

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
