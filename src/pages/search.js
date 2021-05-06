import React from 'react'
import { useQuery } from 'urql'
import { parse } from 'qs'
import { Grid, Box, Text, Container } from 'theme-ui'
import Layout from '../components/layout'
import { SEARCH_QUERY } from '../queries/search'
import ResultsHeader from '../components/collection/ResultsHeader'
import SearchProduct from '../components/SearchProduct'

const SearchPage = ({ location: { search } }) => {
  const { q: term } = parse(search?.replace('?', ''))

  const [query] = useQuery({
    query: SEARCH_QUERY,
    variables: { query: term, first: 250 },
    pause: !term || term.length < 3,
  })

  return (
    <Layout>
      <Container>
        <ResultsHeader
          title={`Search: ${term}`}
          count={query.data?.products.edges.length || 0}
          resultType="results"
        />
        <Grid
          p={[3, 4, 5]}
          sx={{
            gridTemplateColumns: [
              'repeat(2, 1fr)',
              'repeat(auto-fill, minmax(190px, 1fr))',
              'repeat(auto-fill, minmax(240px, 1fr))',
            ],
            gap: [3, 4, 5],
          }}
        >
          {query.data?.products.edges.slice(0, 30).map(({ node }) => {
            const images = node.images.edges.map(({ node }) => node)
            return (
              <SearchProduct
                key={`search-result-${node.id}`}
                product={node}
                images={images}
              />
            )
          })}
        </Grid>
      </Container>
    </Layout>
  )
}

export default SearchPage
