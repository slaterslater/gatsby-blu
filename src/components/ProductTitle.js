import { useMemo } from 'react'

export const useProductTitle = title =>
  useMemo(() => title.split(' - ')[0].toLowerCase(), [title])

const ProductTitle = ({ title }) => useProductTitle(title)

export default ProductTitle
