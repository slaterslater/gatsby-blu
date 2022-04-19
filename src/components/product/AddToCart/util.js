import { useMemo } from 'react'
import { DateTime } from 'luxon'

export const getPreorderMessage = preorder => {
  if (!preorder) return null
  const preorderDate = DateTime.fromISO(preorder.value)
  const now = DateTime.now()
  if (preorderDate < now) return null
  return `expected to ship week of ${preorderDate.toFormat('MMM d')}`
}

export const getProductAttributes = ({ tags, metafields }) => {
  const ProductAttributes = []
  const madeToOrder = tags.some(tag => tag.includes('made-to-order'))
  const preorder = metafields.find(({ key }) => key === 'pre_order')
  const preorderMessage = getPreorderMessage(preorder)
  if (madeToOrder)
    ProductAttributes.push({
      key: 'made to order',
      value: 'allow 4 - 6 weeks production and delivery',
    })
  if (preorderMessage)
    ProductAttributes.push({
      key: 'pre-order',
      value: preorderMessage,
    })
  return ProductAttributes
}

export const useProductPreorderMessage = metafields =>
  useMemo(() => {
    const preorder = metafields.find(({ key }) => key === 'pre_order')
    return getPreorderMessage(preorder)
  }, [metafields])
