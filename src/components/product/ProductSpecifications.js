import React, { useContext, useMemo } from 'react'
import { ShopifyHtml } from '../ShopifyHtml'

import { ProductContext } from './ProductContext'

export const ProductSpecifications = props => {
  const {
    product: { metafields },
  } = useContext(ProductContext)

  const specifications = useMemo(() => {
    const specs = metafields?.find(
      metafield => metafield.key === 'product_specifications'
    )
    if (specs) return specs.value.split('\n')
    return undefined
  }, [JSON.stringify(metafields)])

  if (!specifications) return false

  return (
    <ShopifyHtml>
      <ul>
        {specifications.map(s => (
          <li dangerouslySetInnerHTML={{ __html: s }} />
        ))}
      </ul>
    </ShopifyHtml>
  )
}
