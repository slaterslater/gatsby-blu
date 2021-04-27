import React from 'react'
import path from 'path-browserify'
import { Image, Grid, Box, Flex, Text } from 'theme-ui'
import { Link } from 'gatsby'
import { useQuery } from 'urql'
import { PRODUCT_QUERY } from '../queries/search'
import ProductTitle from './ProductTitle'

const getSrcWithSize = (src, size) => {
  const extName = path.extname(src)
  return src.replace(extName, `_${size}${extName}`)
}

const ProductThumbnail = ({ originalSrc, alt }) => {
  const srcs = [200, 400, 600].map(
    width => `${getSrcWithSize(originalSrc, `${width}x`)} ${width}w`
  )

  return <Image src={srcs[0]} srcSet={srcs.join(', ')} alt={alt} />
}

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
          <Link to={`/search?q=${term}`}>See All</Link>
        </Text>
      </Flex>
      {availableProducts.length ? (
        <Grid py={5} sx={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: 5 }}>
          {availableProducts.slice(0, 4).map(product => (
            <Box key={`${product.id}-search-preview`}>
              <ProductThumbnail
                originalSrc={product.images.edges[0].node.originalSrc}
              />
              <Text variant="caps" sx={{ fontSize: 0, textAlign: 'center' }}>
                <ProductTitle title={product.title} />
              </Text>
            </Box>
          ))}
        </Grid>
      ) : (
        <Box pt={5}>no results :(</Box>
      )}
    </Box>
  )
}

export default SearchPreview
