import React, { useState, useEffect } from 'react'
import { Link, Grid, Box, Text, Checkbox } from 'theme-ui'
import { useLocation, useParams } from '@reach/router'
import { parse, stringify } from 'qs'
import { Link as GatsbyLink } from 'gatsby'

const sortOptions = [
  {
    label: 'Price Low To High',
    param: 'price-asc',
  },
  {
    label: 'Price High To Low',
    param: 'price-desc',
  },
  {
    label: 'Latest Pieces',
    param: 'latest',
  },
]

const SortOption = ({ isSelected, ...props }) => (
  <Box>
    <Link
      as={GatsbyLink}
      type="button"
      sx={{
        fontSize: 1,
        '&::before': {
          content: isSelected ? "'✓ '" : "''",
        },
      }}
      {...props}
    />
  </Box>
)

const CollectionFilterAndSort = ({ isOpen }) => {
  const location = useLocation()
  const currentParams = parse(location.search.replace('?', ''))

  if (!isOpen) return false

  return (
    <Grid pt={5}>
      <Box>
        <Text>Sort</Text>
        {sortOptions.map((option, i) => {
          const nextParams = {
            ...currentParams,
            sort: option.param,
          }
          const searchString = stringify(nextParams)

          const pathWithSortParam = `${location.pathname}?${searchString}`

          const isSelected = currentParams.sort === option.param

          return (
            <SortOption
              key={`sort-option-${i}`}
              isSelected={isSelected}
              to={isSelected ? location.pathname : pathWithSortParam}
            >
              {option.label}
            </SortOption>
          )
        })}
      </Box>
    </Grid>
  )
}

export default CollectionFilterAndSort
