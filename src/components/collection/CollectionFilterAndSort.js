import React, { useMemo, useState } from 'react'
import { Grid, Box, Text } from 'theme-ui'
import { useLocation } from '@reach/router'
import { parse, stringify } from 'qs'
import { VscTriangleRight } from 'react-icons/vsc'
import { graphql, useStaticQuery } from 'gatsby'
import { omit } from 'lodash'
import {
  DropdownSort,
  DropdownFilter,
  ModalSortAndFilter,
} from './CollectionDropdowns'
// import { metals } from '../../data/metals'

const sortOptions = [
  {
    label: 'new arrivals',
    param: 'latest',
  },
  {
    label: 'Price: Low To High',
    param: 'price-asc',
  },
  {
    label: 'Price: High To Low',
    param: 'price-desc',
  },
]

const Triangle = () => (
  <Text as={VscTriangleRight} size={10} sx={{ color: 'sterlingSilver' }} />
)

const CollectionFilterAndSort = ({ title, products }) => {
  const location = useLocation()
  const data = useStaticQuery(graphql`
    {
      allShopifyProductMetafield(filter: { key: { eq: "filters" } }) {
        nodes {
          value
        }
      }
    }
  `)

  const pathWithParams = params => `${location.pathname}?${stringify(params)}`
  const currentParams = parse(location.search.replace('?', ''))
  const currentPath = pathWithParams({ sort: currentParams.sort })
  const selectedFilters = omit(currentParams, ['sort'])

  const currentSortOptions = sortOptions.map(option => {
    const nextParams = {
      ...currentParams,
      sort: option.param,
    }
    return {
      ...option,
      isSelected: currentParams.sort === option.param,
      to: pathWithParams(nextParams).replaceAll('%20', '+'),
    }
  })

  const filterOptions = useMemo(() => {
    const filtersFromProducts = data.allShopifyProductMetafield.nodes.reduce(
      (filters, metafield) => {
        const values = JSON.parse(metafield.value)
        values.forEach(value => {
          // find at least one product with this value other skip it
          const isProductWithFilterValue = products.some(({ metafields }) =>
            metafields.some(
              field => field.key === 'filters' && field.value.includes(value)
            )
          )
          if (!isProductWithFilterValue) return
          const [label, option] = value.split(': ')
          const currentFilter = filters.find(filter => filter.label === label)
          if (currentFilter) {
            const { options } = currentFilter
            const isOption = options.includes(option)
            if (!isOption) options.push(option)
          } else {
            filters.push({ label, options: [option] })
          }
        })
        return filters
      },
      []
    )

    return [
      // {
      //   label: 'metal',
      //   options: metals.map(metal => metal.replaceAll(' ', '-')),
      // },
      ...filtersFromProducts,
    ]
  }, [data])

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
