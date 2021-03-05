import React from 'react'
// import { get } from 'lodash'
import { useQuery } from 'urql'
import { parse } from 'qs'
import { Grid, Box, Text } from 'theme-ui'
import Layout from '../../components/layout'
import { PRODUCT_QUERY } from '../../queries/search'
import ProductTitle from '../../components/ProductTitle'
import RemoteShopifyImage from '../../components/RemoteShopifyImage'

const SearchPage = ({ location: { search } }) => {
  const { q: term } = parse(search?.replace('?', ''))

  const [query] = useQuery({
    query: PRODUCT_QUERY,
    variables: { query: term, first: 250 },
    pause: !term || term.length < 3,
  })

  return (
    <Layout>
      <Grid
        p={[3, 4, 5]}
        sx={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: [3, 4, 5],
        }}
      >
        {query.data?.products.edges.slice(0, 30).map(({ node }) => {
          const firstImage = node.images?.edges[0]?.node || {}
          return (
            <Box key={`search-result-${node.id}`}>
              {firstImage.originalSrc && (
                <RemoteShopifyImage
                  originalSrc={firstImage.originalSrc}
                  altText={firstImage.altText}
                  lazy
                />
              )}
              <Text variant="caps" sx={{ textAlign: 'center', fontSize: 10 }}>
                <ProductTitle title={node.title} />
              </Text>
            </Box>
          )
        })}
      </Grid>
    </Layout>
  )
}

export default SearchPage
