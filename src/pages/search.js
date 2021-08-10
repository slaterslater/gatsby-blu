import React, { useState, useEffect } from 'react'
import { parse } from 'qs'
import { Flex, Button, Input, Grid, Box, Text, Container } from 'theme-ui'
import { IoIosSearch } from 'react-icons/io'
import { InstantSearch, connectInfiniteHits } from 'react-instantsearch-dom'
import Layout from '../components/layout'
import {
  InstantSearchProduct,
  InstantSearchInput,
  HitsCount,
  searchClient,
} from '../components/search/shared'
import SuggestedSearches from '../components/search/SuggestedSearches'

const SearchHits = connectInfiniteHits(
  ({ hits, hasMore, refineNext, ...rest }) => (
    <>
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
        {hits.map(hit => (
          <InstantSearchProduct key={`hit-${hit.id}`} hit={hit} />
        ))}
      </Grid>
      {hasMore && (
        <Box sx={{ textAlign: 'center' }}>
          <Button type="button" onClick={refineNext}>
            Load More
          </Button>
        </Box>
      )}
    </>
  )
)

const SearchPage = ({ location: { search } }) => {
  const [query] = useState(parse(search?.replace('?', '')).q)
  const [usedInput, setUsedInput] = useState(!!query)

  return (
    <Layout title="product search">
      <Container>
        <InstantSearch
          searchClient={searchClient}
          indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}
        >
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
            <InstantSearchInput
              initialValue={query}
              onChange={() => {
                if (!usedInput) {
                  setUsedInput(true)
                }
              }}
            />
            <HitsCount />
          </Grid>
          {usedInput && <SearchHits />}
          {!usedInput && (
            <Box pb={6}>
              <SuggestedSearches />
            </Box>
          )}
        </InstantSearch>
      </Container>
    </Layout>
  )
}

export default SearchPage
