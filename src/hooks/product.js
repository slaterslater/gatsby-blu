import { useMemo, useContext } from 'react'
import { parse } from 'qs'
import { useLocation } from '@reach/router'
import { useQuery } from 'urql'
import { PRODUCT_QUERY } from '../queries/product'
import { useAnalytics } from '../lib/useAnalytics'
import { CurrencyContext } from '../contexts/CurrencyContext'
import { ProductContext } from '../components/product/ProductContext'
import { useMetafieldValue } from './useMetafield'

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

export const useProductGalleryImages = () => {
  const {
    product: { images, metafields },
  } = useContext(ProductContext)
  const giftPackagingImageStyle = useMetafieldValue(
    'gift_wrapping_style',
    metafields
  )

  if (!giftPackagingImageStyle) return images || []

  const packagingImages = [
    {
      type: 'paper',
      url: 'https://cdn.shopify.com/s/files/1/0685/0359/files/packaging-4.jpg?v=1620925677',
    },
    {
      type: 'velvet',
      url: 'https://cdn.shopify.com/s/files/1/0685/0359/files/packaging-box-velvet.jpg?v=1648745248',
    },
  ]

  const { url } = packagingImages.find(
    ({ type }) => type === giftPackagingImageStyle.toLowerCase()
  )

  return [
    ...images,
    {
      url,
      height: 3000,
      width: 3000,
      altText: 'packaging',
      id: 'product_packaging_style',
      __typename: 'Image',
    },
  ]
}

export const useProductGalleryVideos = () => {
  const {
    product: { media },
  } = useContext(ProductContext)

  const videos = media?.edges
    .filter(({ node }) => node.__typename === 'Video')
    .map(({ node }) => node)

  return videos || []
}

export const useProductGalleryMedia = () => {
  const {
    product: { media, metafields },
  } = useContext(ProductContext)
  const giftPackagingImageStyle = useMetafieldValue(
    'gift_wrapping_style',
    metafields
  )

  const productGalleryMedia =
    media?.edges.map(({ node }) => {
      if (node.image) return node.image
      return node
    }) || []

  if (!giftPackagingImageStyle) return productGalleryMedia

  const packagingImages = [
    {
      type: 'paper',
      url: 'https://cdn.shopify.com/s/files/1/0685/0359/files/packaging-4.jpg?v=1620925677',
    },
    {
      type: 'velvet',
      url: 'https://cdn.shopify.com/s/files/1/0685/0359/files/packaging-box-velvet.jpg?v=1648745248',
    },
  ]

  const { url } = packagingImages.find(
    ({ type }) => type === giftPackagingImageStyle.toLowerCase()
  )

  return [
    ...productGalleryMedia,
    {
      url,
      height: 3000,
      width: 3000,
      altText: 'packaging',
      id: 'product_packaging_style',
      __typename: 'Image',
    },
  ]
}
