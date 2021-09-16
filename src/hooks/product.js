import { useMemo } from 'react'
import { parse } from 'qs'
import { useLocation } from '@reach/router'
import { useQuery } from 'urql'
import { PRODUCT_QUERY } from '../queries/product'
import { useAnalytics } from '../lib/useAnalytics'

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
  const [{ data }] = useQuery({
    query: PRODUCT_QUERY,
    variables: { handle },
  })

  return useMemo(() => {
    if (data) {
      return getProduct(data.productByHandle)
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
