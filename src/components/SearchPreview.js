import React, { useMemo } from 'react'
import { Image, Grid, Box, Flex, Text } from 'theme-ui'
import { Link } from 'gatsby'
import { useQuery } from 'urql'
import { GatsbyImage } from 'gatsby-plugin-image'
import { SEARCH_QUERY } from '../queries/search'
import ProductTitle from './ProductTitle'
import ThemeLink from './app/ThemeLink'
import { useShopifyImage } from '../hooks/shopifyImage'
import { useShopifyProductQuery } from '../hooks/shopifyProductQuery'

const SearchPreviewItem = ({ product }) => {
  const image = useShopifyImage({ image: product.images.edges[0]?.node })

  return (
    <Box
      as={Link}
      to={`/products/${product.handle}`}
      key={`${product.id}-search-preview`}
      sx={{ textDecoration: 'none' }}
    >
      <GatsbyImage image={image} altText="" />
      <Text
        as="p"
        variant="caps"
        sx={{
          color: 'darkerGray',
          textAlign: 'center',
          fontSize: 0,
        }}
      >
        <ProductTitle title={product.title} />
      </Text>
    </Box>
  )
}

const SearchPreview = ({ term = '', onClose }) => {
  const shopifyProductQuery = useShopifyProductQuery(term)

  const [query] = useQuery({
    query: SEARCH_QUERY,
    variables: {
      query: shopifyProductQuery,
      first: 4,
    },
    pause: term.length < 3,
  })

  if (term.length < 3 || !query.data) return false

  const availableProducts = query.data.products.edges
    .filter(({ node }) => node.availableForSale)
    .map(({ node }) => node)

  return (
    <Box pt={6}>
      <Flex
        pb={3}
        sx={{
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          borderColor: 'border',
        }}
      >
        <Text variant="caps" sx={{ fontSize: 0 }}>
          {availableProducts.length} results
        </Text>
        <Text variant="caps" sx={{ fontSize: 0 }}>
          <ThemeLink onClick={onClose} to={`/search?q=${term}`}>
            See All
          </ThemeLink>
        </Text>
      </Flex>
      {availableProducts.length ? (
        <Grid py={5} sx={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 5 }}>
          {availableProducts.slice(0, 4).map(product => (
            <SearchPreviewItem product={product} />
          ))}
        </Grid>
      ) : (
        <Box pt={5}>no results :(</Box>
      )}
    </Box>
  )
}

export default SearchPreview
