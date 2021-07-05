import { useMemo } from 'react'
import { getShopifyImage } from '../lib/get-shopify-image'

export function useShopifyImage({ image, width }) {
  const { originalSrc, height, width: originalWidth } = image || {}
  return useMemo(() => {
    if (!originalSrc || !height || !originalWidth) return false
    return getShopifyImage({
      image: { originalSrc, height, width: originalWidth },
      width,
    })
  }, [originalSrc, height, originalWidth, width])
}
