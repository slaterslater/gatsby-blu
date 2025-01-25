import { useContext, useMemo } from 'react'
import { useQuery } from 'urql'
import { useLocation } from '@reach/router'
import { parse, stringify } from 'qs'
import dayjs from 'dayjs'
import { graphql, useStaticQuery } from 'gatsby'
import { pick } from 'lodash'
import { CurrencyContext } from '../contexts/CurrencyContext'
import { COLLECTION_PAGE_QUERY } from '../queries/collection'
// import { getCollectionProducts } from '../views/CollectionView'
// import { metals } from '../../data/metals'

export const getCollectionProducts = products => {
  if (!products) return undefined
  return products.edges.map(({ node }) => ({
    ...node,
    variants: node.variants.edges.map(({ node: n }) => n),
    images: node.images.edges.map(({ node: n }) => n),
    metafields: node.metafields.filter(metafield => !!metafield),
  }))
}

export const useLatestCollection = (handle, initialProducts) => {
  const { countryCode } = useContext(CurrencyContext)
  const [{ data: latestData }] = useQuery({
    query: COLLECTION_PAGE_QUERY,
    variables: { handle, countryCode },
  })
  const { products, metafields } = latestData?.collection || {}

  const collectionImages = useMemo(() => {
    if (!metafields) return []
    return metafields
      .filter(metafield => metafield?.key.startsWith('collection_image'))
      .map(({ key, reference: { image } }) => ({
        key,
        ...image,
      }))
      .sort((a, b) => a.key.localeCompare(b.key))
  }, [metafields])

  const collectionProducts = useMemo(() => {
    const latestProducts = getCollectionProducts(products)
    if (!latestProducts) return initialProducts
    const updatedProducts = latestProducts.map(product => {
      const initial = initialProducts?.find(({ id }) => id === product.id)
      return {
        ...initial,
        ...product,
      }
    })
    return updatedProducts.filter(({ tags }) => !tags.includes('hidden'))
  }, [products, initialProducts])

  return {
    collectionProducts,
    collectionImages,
  }
}

export const useCollectionFilterAndSortOptions = products => {
  const { pathname, search } = useLocation()

  const pathWithParams = params => `${pathname}?${stringify(params)}`
  const currentParams = parse(search.replace('?', ''))
  const { sort, ...params } = currentParams
  const currentPath = pathWithParams({ sort })

  const data = useStaticQuery(graphql`
    {
      allShopifyMetafield(filter: {ownerType: {eq: COLLECTION}}) {
        nodes {
          value
        }
      }
    }
  `)

  const filterOptions = useMemo(() => {
    const filtersFromProducts = data.allShopifyMetafield.nodes.reduce(
      (filters, metafield) => {
        // console.log({metafield})
        // const values = JSON.parse(metafield.value)
        const values = metafield.value.split(',')
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
  }, [data, products])

  const selectedFilters = pick(
    params,
    filterOptions.map(({ label }) => label)
  )

  const filters = Object.keys(selectedFilters).reduce((array, key) => {
    const values = selectedFilters[key].split(' ')
    values.forEach(value => {
      array.push(`${key}: ${value}`)
    })
    return array
  }, [])

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

  const currentSortOptions = sortOptions.map(option => {
    const nextParams = {
      ...currentParams,
      sort: option.param,
    }
    return {
      ...option,
      isSelected: sort === option.param,
      to: pathWithParams(nextParams).replaceAll('%20', '+'),
    }
  })

  return {
    currentPath,
    sort,
    filters,
    currentSortOptions,
    filterOptions,
    selectedFilters,
  }
}

// SORT PRODUCTS
const sortProducts = ({ products, sort }) =>
  products.sort((a, b) => {
    switch (sort) {
      case 'latest':
        return dayjs(b.createdAt) - dayjs(a.createdAt)
      case 'price-asc':
        return (
          a.priceRangeV2.minVariantPrice.amount -
          b.priceRangeV2.minVariantPrice.amount
        )
      case 'price-desc':
        return (
          b.priceRangeV2.minVariantPrice.amount -
          a.priceRangeV2.minVariantPrice.amount
        )
      default:
        return 0
    }
  })

// FILTER PRODUCTS
const filterProducts = ({ products, filters }) => {
  if (!filters.length) return products

  const productSet = new Set()

  products.forEach(product => {
    const filtersMetafield = product.metafields.find(
      ({ key }) => key === 'filters'
    )
    if (!filtersMetafield) return

    // const productFilterOptions = JSON.parse(filtersMetafield.value)
    const productFilterOptions = filtersMetafield.value.split(',')
    const isMatch = filters.some(option =>
      productFilterOptions.includes(option)
    )
    if (isMatch) productSet.add(product)
  })

  return Array.from(productSet)
}

// RETURN FILTERED & SORTED PRODUCTS
export const useSortedFilteredProducts = products => {
  const { sort, filters } = useCollectionFilterAndSortOptions(products)

  return useMemo(() => {
    const filteredProducts = filterProducts({ products, filters })

    switch (true) {
      case !sort && !filters.length:
        return null
      case !sort:
        return filteredProducts
      default:
        return sortProducts({ products: filteredProducts, sort })
    }
  }, [products, sort, filters])
}
