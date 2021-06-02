import React, { useState, useEffect } from 'react'
import { useQuery } from 'urql'
import { parse } from 'qs'
import { Input, Grid, Box, Text, Container } from 'theme-ui'
import { useDebounce } from 'use-debounce'
import { IoIosSearch } from 'react-icons/io'
import Layout from '../components/layout'
import { SEARCH_QUERY } from '../queries/search'
import SearchProduct from '../components/SearchProduct'
import { useShopifyProductQuery } from '../hooks/shopifyProductQuery'

const SearchPage = ({ location: { search } }) => {
  const [value, setValue] = useState(parse(search?.replace('?', '')).q)
  const [term] = useDebounce(value, 1000)

  useEffect(() => {
    setValue(parse(search?.replace('?', '')).q)
  }, [search])

  const shopifyProductQuery = useShopifyProductQuery(term)

  const [query] = useQuery({
    query: SEARCH_QUERY,
    variables: { query: shopifyProductQuery, first: 36 },
    pause: !term || term.length < 3,
  })

  return (
    <Layout>
      <Container>
        {/* <ResultsHeader */}
        {/*   title={`Search: ${term}`} */}
        {/*   count={query.data?.products.edges.length || 0} */}
        {/*   resultType="results" */}
        {/* /> */}
        <Grid
          pb={4}
          sx={{
            gridTemplateColumns: 'max-content 1fr max-content',
            alignItems: 'center',
          }}
        >
          <Box
            as={IoIosSearch}
            size={20}
            color="primary"
            sx={{ transform: 'translateY(-1px)' }}
          />
          <Input
            variant="bigSearch"
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="search ..."
            sx={{
              borderBottom: '1px solid',
              borderColor: 'border',
              '&:focus': {
                borderColor: 'border',
              },
            }}
          />
          <Text variant="caps">
            {query.data?.products.edges.length || 0} results
          </Text>
        </Grid>
        <Grid
          py={[3, 4, 5]}
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
