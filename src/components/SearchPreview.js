import React from 'react'
import { Box, Flex, Text, Link } from 'theme-ui'
import { useQuery } from 'urql'
import { PRODUCT_QUERY } from '../queries/search'

const SearchPreview = ({ term = '' }) => {
  const [query] = useQuery({
    query: PRODUCT_QUERY,
    variables: { query: term, first: 250 },
    pause: term.length < 3,
  })

  if (term.length < 3 || !query.data) return false

  const availableProducts = query.data.products.edges
    .filter(({ node }) => node.availableForSale)
    .map(({ node }) => node)

  return (
    <Box pt={5}>
      <Flex sx={{ justifyContent: 'space-between' }}>
        <Text variant="caps">{availableProducts.length} results</Text>
        <Link to={`/shop/search?q=${term}`}>See All</Link>
      </Flex>
      {availableProducts.length ? (
        <Box pt={5}>
          {availableProducts.slice(0, 4).map(product => (
            <Box>{product.handle}</Box>
          ))}
        </Box>
      ) : (
        <Box pt={5}>no results :(</Box>
      )}
    </Box>
  )
}

export default SearchPreview
