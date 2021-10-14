import { useMemo, useContext } from 'react'
import { parse } from 'qs'
import { useLocation } from '@reach/router'
import { useQuery } from 'urql'
import { PRODUCT_QUERY } from '../queries/product'
import { useAnalytics } from '../lib/useAnalytics'
import { CurrencyContext } from '../contexts/CurrencyContext'

export const getProduct = product => ({
  ...product,
  shopifyId: product.id,
  images: product.images.edges.map(({ node }) => node),
  variants: product.variants.edges.map(({ node }) => ({
    ...node,
    shopifyId: node.id,
  })),
  metafields: product.metafields.edges.map(({ node }) => node),
})

export const useLatestProduct = ({ handle, initial }) => {
  const { countryCode } = useContext(CurrencyContext)
  const [{ data }] = useQuery({
    query: PRODUCT_QUERY,
    variables: { countryCode, handle },
  })

  return useMemo(() => {
    if (data) {
      return getProduct(data.product)
    }
    return initial
  }, [data, initial])
}

export const useViewProductAnalytics = data => {
  const { search } = useLocation()

  const { variant, currency } = parse(search?.replace('?', ''))
  useAnalytics('viewProduct', {
    product: data.shopifyProduct,
    variant,
    currency,
  })
}

export const useInitialProduct = ({ handle }) => {
  const { countryCode } = useContext(CurrencyContext)
  const [{ data }] = useQuery({
    query: PRODUCT_QUERY,
    variables: { countryCode, handle },
  })

  return useMemo(() => {
    if (data) {
      return getProduct(data.product)
    }
    return undefined
  }, [data])
}
