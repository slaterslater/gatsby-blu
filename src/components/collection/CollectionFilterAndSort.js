import React from 'react'
import { Grid, Box, Text } from 'theme-ui'
import { VscTriangleRight } from 'react-icons/vsc'
import {
  DropdownSort,
  DropdownFilter,
  ModalSortAndFilter,
} from './CollectionDropdowns'
import { useCollectionFilterAndSortOptions } from '../../hooks/collection'

const Triangle = () => (
  <Text as={VscTriangleRight} size={10} sx={{ color: 'sterlingSilver' }} />
)

const CollectionFilterAndSort = ({ title, products }) => {
  const { currentPath, currentSortOptions, filterOptions, selectedFilters } =
    useCollectionFilterAndSortOptions(products)

  return (
    <>
      <Box
        pt={5}
        sx={{
          display: ['none', 'flex'],
          justifyContent: 'space-between',
        }}
      >
        <Grid
          sx={{
            gridTemplateColumns: 'repeat(5, max-content)',
            gap: 2,
            alignItems: 'center',
            span: { cursor: 'pointer' },
          }}
        >
          <Text variant="caps">collection</Text>
          <Triangle />
          <Text variant="caps">{title}</Text>
          <Triangle />
          <Text variant="caps">{products.length} products</Text>
        </Grid>
        {!!filterOptions.length && (
          <DropdownFilter
            filterOptions={filterOptions}
            currentPath={currentPath}
            selectedFilters={selectedFilters}
          />
        )}
        <DropdownSort sortOptions={currentSortOptions} />
      </Box>
      <ModalSortAndFilter
        sortOptions={currentSortOptions}
        filterOptions={filterOptions}
        currentPath={currentPath}
        selectedFilters={selectedFilters}
      />
    </>
  )
}

export default CollectionFilterAndSort
