import { useMemo } from 'react'

export function useShopifyProductQuery(term) {
  return useMemo(() => `title:${term}* OR product_type:${term}*`, [term])
}
