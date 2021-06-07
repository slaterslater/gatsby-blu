import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import { connectStats, connectSearchBox } from 'react-instantsearch-dom'
import { Text, Input } from 'theme-ui'
import ProductListItem from '../product/ListItem'
import { useProductTitle } from '../ProductTitle'
import { useProductPrice } from '../CollectionProduct'

export const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
)

export const InstantSearchInput = connectSearchBox(
  ({ refine, currentRefinement, onFocus, onChange = () => {} }) => (
    <Input
      variant="bigSearch"
      type="text"
      value={currentRefinement}
      onChange={e => {
        refine(e.target.value)
        onChange()
      }}
      placeholder="search ..."
      sx={{
        borderBottom: '1px solid',
        borderColor: 'border',
        '&:focus': {
          borderColor: 'border',
          outline: 'none',
        },
      }}
    />
  )
)

export const InstantSearchProduct = ({ hit }) => {
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

export const HitsCount = connectStats(({ nbHits }) => (
  <Text variant="caps">
    {nbHits || 0} result{nbHits !== 1 ? 's' : ''}
  </Text>
))
