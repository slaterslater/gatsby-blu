import { Box } from 'theme-ui'
import React from 'react'
import CollectionProduct from '../CollectionProduct'
import CollectionProductGroup from '../CollectionProductGroup'

const groupProducts = (products, fallback = 'Fallback Subgroup') =>
  products.reduce((acc, el) => {
    const { subgroup } = el
    if (subgroup) {
      return {
        ...acc,
        [subgroup]: (acc[subgroup] || []).concat(el),
      }
    }
    acc[fallback] = (acc[fallback] || []).concat(el)
    return acc
  }, {})

const ProductGrid = ({ products }) => {
  const productGroups = groupProducts(products)

  return (
    <Box>
      {Object.keys(productGroups).map(key => (
        <CollectionProductGroup groupType={key} key={key}>
          {productGroups[key].map(product => (
            <CollectionProduct key={product.id} product={product} />
          ))}
        </CollectionProductGroup>
      ))}
    </Box>
  )
}

export default ProductGrid
