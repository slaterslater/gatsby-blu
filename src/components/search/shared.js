import React, { useEffect, useRef } from 'react'
// import algoliasearch from 'algoliasearch/lite'
import { liteClient as algoliasearch } from 'algoliasearch/lite'
import { connectStats, connectSearchBox } from 'react-instantsearch-dom'
import { Text, Input, Button } from 'theme-ui'
import ProductListItem from '../product/ListItem'
import { useProductTitle } from '../ProductTitle'
import { useProductPrice } from '../CollectionProduct'

export const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
)

export const InstantSearchInput = connectSearchBox(
  ({
    refine,
    currentRefinement,
    onFocus,
    onChange = () => {},
    initialValue,
  }) => {
    const inputRef = useRef()
    useEffect(() => {
      inputRef.current.focus()
      if (initialValue) {
        refine(initialValue)
      }
    }, [])

    return (
      <Input
        ref={inputRef}
        variant="bigSearch"
        type="text"
        value={currentRefinement}
        onChange={e => {
          refine(e.target.value)
          onChange(e.target.value)
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
  }
)

export const InstantSearchProduct = ({ hit }) => {
  const title = useProductTitle(hit.title)
  const [price, hasRange] = useProductPrice(hit)

  return (
    <ProductListItem
      title={title}
      to={`/products/${hit.handle}`}
      firstImage={hit.images[0]}
      secondImage={hit.images[1]}
      price={price}
      hasRange={hasRange}
      tags={hit.tags}
      metafields={hit.metafields}
      availableForSale={hit.availableForSale}
    />
  )
}

export const HitsCount = connectStats(({ nbHits }) => (
  <Text variant="caps">
    {nbHits || 0} result{nbHits !== 1 ? 's' : ''}
  </Text>
))

export const ViewMore = connectStats(({ nbHits }) => {
  if (nbHits <= 4) return <HitsCount />
  return <Button variant="inverted">{`view ${nbHits - 4} more`}</Button>
})
