import { useMemo } from 'react'
import pluralize from 'pluralize'

export function useShopifyProductQuery(term = '') {
  return useMemo(
    () =>
      `available_for_sale:true AND (product_type:${pluralize(
        term
      )} OR title:${term}* OR tag:${term}*)`,
    [term]
  )
}
