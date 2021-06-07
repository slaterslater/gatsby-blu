import React, { useState, useEffect } from 'react'
import { parse } from 'qs'
import { Flex, Button, Input, Grid, Box, Text, Container } from 'theme-ui'
import { IoIosSearch } from 'react-icons/io'
import algoliasearch from 'algoliasearch/lite'
import {
  InstantSearch,
  connectSearchBox,
  connectHits,
  connectStats,
} from 'react-instantsearch-dom'
import Layout from '../components/layout'
import ProductListItem from '../components/product/ListItem'
import { useProductTitle } from '../components/ProductTitle'
import { useProductPrice } from '../components/CollectionProduct'

const HitsCount = connectStats(({ nbHits }) => (
  <Text variant="caps">
    {nbHits || 0} result{nbHits !== 1 ? 's' : ''}
  </Text>
))

const InstantSearchProduct = ({ hit }) => {
  const title = useProductTitle(hit.title)
  const [price, hasRange] = useProductPrice(hit)

  // const price
  return (
    <ProductListItem
      title={title}
      to={`/products/${hit.handle}`}
      firstImage={hit.images[0]}
      secondImage={hit.images[1]}
      price={price}
      hasRange={hasRange}
      tags={hit.tags}
      availableForSale={hit.availableForSale}
    />
  )
}

const SearchHits = connectHits(({ hits }) => (
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
))

const InstantSearchInput = connectSearchBox(
  ({ refine, currentRefinement, onFocus }) => (
    <Input
      variant="bigSearch"
      type="text"
      value={currentRefinement}
      onChange={e => refine(e.target.value)}
      placeholder="search ..."
      sx={{
        borderBottom: '1px solid',
        borderColor: 'border',
        '&:focus': {
          borderColor: 'border',
        },
      }}
    />
  )
)

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
)

const SearchPage = ({ location: { search } }) => {
  const [query, setQuery] = useState(parse(search?.replace('?', '')).q)

  useEffect(() => {
    setQuery(parse(search?.replace('?', '')).q)
  }, [search])

  return (
    <Layout>
      <Container>
        <InstantSearch
          searchClient={searchClient}
          onSearchStateChange={({ query }) => setQuery(query)}
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
            <InstantSearchInput />
            <HitsCount />
          </Grid>
          <SearchHits />
        </InstantSearch>
      </Container>
    </Layout>
  )
}

export default SearchPage
