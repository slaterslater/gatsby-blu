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

  const [{ data, fetching }] = useQuery({
    query: SEARCH_QUERY,
    variables: {
      query: shopifyProductQuery,
      first: 50,
    },
    pause: term.length < 3,
  })

  if (term.length < 3 || !data) return false

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
          {data.products.edges.length}
          {data.products.pageInfo.hasNextPage ? '+' : ''} results
        </Text>
        <Text variant="caps" sx={{ fontSize: 0 }}>
          <ThemeLink onClick={onClose} to={`/search?q=${term}`}>
            See All
          </ThemeLink>
        </Text>
      </Flex>
      {data.products.edges.length ? (
        <Grid
          py={5}
          sx={{
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 5,
            opacity: fetching ? '.7' : 1,
            transition: 'opacity ease-out .3s',
          }}
        >
          {data.products.edges.slice(0, 4).map(({ node: product }) => (
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
