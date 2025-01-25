import { useMemo, useContext } from 'react'
import { parse } from 'qs'
import { useLocation } from '@reach/router'
import { useQuery } from 'urql'
import dayjs from 'dayjs'
import { PRODUCT_QUERY } from '../queries/product'
import { useAnalytics } from '../lib/useAnalytics'
import { CurrencyContext } from '../contexts/CurrencyContext'
import { ProductContext } from '../components/product/ProductContext'
import { useMetafieldValue } from './useMetafield'
import { metals } from '../data/metals'

export const getProduct = product => ({
  ...product,
  shopifyId: product.id,
  media: product.media.nodes.map(({image, mediaContentType}) => ({
    image,
    mediaContentType
  })),
  variants: product.variants.edges.map(({ node }) => ({
    ...node,
    shopifyId: node.id,
  })),
  // metafields: product.metafields.edges.map(({ node }) => node),
  metafields: product.metafields.filter(metafield => !!metafield),
})

export const useLatestProduct = ({ handle, initial }) => {
  const { countryCode } = useContext(CurrencyContext)
  const [{ data }] = useQuery({
    query: PRODUCT_QUERY,
    variables: { countryCode, handle },
  })

  return useMemo(() => {
    if (!data) return initial
    return getProduct(data.product)
  }, [data, initial])
}

export const useViewProductAnalytics = product => {
  const { search } = useLocation()

  const { variant, currency } = parse(search?.replace('?', ''))
  useAnalytics('viewProduct', {
    product,
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
    if (!data) return undefined
    return getProduct(data.product)
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
    ({ type }) => type === giftPackagingImageStyle.trim().toLowerCase()
  )

  return [
    ...images,
    {
      url,
      height: 3000,
      width: 3000,
      altText: 'packaging',
      id: 'product_packaging_style',
      mediaContentType: 'IMAGE',
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
    product: { title, media, metafields },
  } = useContext(ProductContext)

  const giftPackagingImageStyle = useMetafieldValue(
    'gift_wrapping_style',
    metafields
  )

  if (!media) return []

  // maybe need to include video post gatsby 5 update?
  // const productGalleryMedia =
  //   media.map(({image}) => {
  //     return {
  //       ...image,
  //       altText: image.altText || title,
  //     }
  //   }) || []

  // if (!giftPackagingImageStyle) return productGalleryMedia
  if (!giftPackagingImageStyle) return media

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
    ({ type }) => type === giftPackagingImageStyle.trim().toLowerCase()
  )

  const image = {
    url,
    height: 3000,
    width: 3000,
    altText: 'packaging',
    id: 'product_packaging_style',
    mediaContentType: 'IMAGE',
  }

  return [
    // ...productGalleryMedia,
    ...media,
    {image},
  ]
}

export const useProductMetalColor = (options = []) => {
  const color = options
    .find(({ name }) => name?.toLowerCase() === 'metal')
    ?.values[0].toLowerCase()
  return metals.includes(color) ? color : null
}

export const useMadeToOrder = () => {
  const {
    product: { tags, madeToOrder },
    selectedVariant,
  } = useContext(ProductContext)

  const weeks = {
    'made-to-order-1': process.env.GATSBY_MADE_TO_ORDER_1,
    'made-to-order-2': process.env.GATSBY_MADE_TO_ORDER_2,
  }

  const mto = madeToOrder?.value || selectedVariant?.madeToOrder?.value
  if (mto) return weeks[JSON.parse(mto)[0]]

  const isSize10 = selectedVariant?.selectedOptions?.some(
    ({ name, value }) => name.toLowerCase() === 'size' && value === '10'
  )
  if (isSize10 || tags.includes('made-to-order')) return weeks['made-to-order']

  return null
}

export const useProductLabel = ({ tags, metafields }) => {
  if (!tags && !metafields) return null
  const labelTag = tags.find(tag => tag.includes('__label'))
  const labelMetaField = metafields.find(({ key }) => key === 'label')

  const { value, updatedAt } = labelMetaField || {}

  const labelText = value
    ? JSON.parse(value)[0]
    : labelTag?.replace('__label:', '')

  const numWeeksOld = dayjs().diff(updatedAt, 'week')
  const restockedWeeksAgo = value === 'restocked' && numWeeksOld > 2

  if (!labelText || restockedWeeksAgo) return null
  return labelText.toLowerCase()
}
