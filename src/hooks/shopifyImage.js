import { useMemo } from 'react'
import { getShopifyImage } from '../lib/get-shopify-image'

export function useShopifyImage({ image, width, height }) {
  const {
    originalSrc,
    src,
    height: originalHeight,
    width: originalWidth,
  } = image || {}
  return useMemo(() => {
    if (!(originalSrc || src) || !originalHeight || !originalWidth) return false
    return getShopifyImage({
      image: {
        originalSrc: originalSrc || src,
        height: originalHeight,
        width: originalWidth,
      },
      width,
      height,
    })
  }, [originalSrc, height, originalWidth, width])
}
