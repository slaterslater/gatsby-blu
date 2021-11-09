import { Box, Text } from 'theme-ui'
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

  return (
    <>
      {!!specifications && (
        <Box as="ul" px={2} py={0}>
          {specifications.map(s => (
            <Text
              as="li"
              dangerouslySetInnerHTML={{ __html: s }}
              key={s}
              pb={2}
              sx={{
                fontSize: 0,
                letterSpacing: 'widest',
                textTransform: 'lowercase',
                lineHeight: '1.5em',
                listStyleType: 'none',
              }}
            />
          ))}
        </Box>
      )}
    </>
  )
}
