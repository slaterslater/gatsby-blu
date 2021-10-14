import { useMemo } from 'react'

export const useMetafieldValue = (key, metafields) =>
  useMemo(() => {
    const metafield = metafields?.find(field => field.key === key)
    return metafield?.value
  }, [key, JSON.stringify(metafields)])
