import { useMemo } from 'react'
import { getShopifyImage } from '../lib/get-shopify-image'

export function useShopifyImage({ image, width, height }) {
  const {
    url,
    src,
    height: originalHeight,
    width: originalWidth,
  } = image || {}
  return useMemo(() => {
    if (!(url || src) || !originalHeight || !originalWidth) return false
    return getShopifyImage({
      image: {
        url: url || src,
        height: originalHeight,
        width: originalWidth,
      },
      width,
      height,
    })
  }, [url, height, originalWidth, width])
}
