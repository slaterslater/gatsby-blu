import { useMemo } from 'react'
import { getShopifyImage } from '../lib/get-shopify-image'

export function useShopifyImage({ image, width }) {
  return useMemo(() => {
    if (!image) return false
    return getShopifyImage({ image, width })
  }, [JSON.stringify(image), width])
}
