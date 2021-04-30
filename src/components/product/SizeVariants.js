import { useMatch } from '@reach/router'
import { useQuery } from 'urql'
import { Grid, Heading } from 'theme-ui'
import React from 'react'
import { PRODUCT_QUERY } from '../../queries/product'
import VariantOption from './VariantOption'

const getLatestVariant = (data, id) => {
  if (!data?.productByHandle) return null

  const latestVariant = data.productByHandle.variants.edges.find(
    ({ node }) => node.id === id
  )

  return latestVariant.node
}

const SizeVariants = ({ variants, onSelect, selectedVariant }) => {
  const hasSizeVariants = !!variants.find(variant =>
    variant.selectedOptions.find(
      opt => opt.name === 'Size' || opt.name === 'length'
    )
  )

  const { handle } = useMatch('/products/:handle')
  const [{ data, fetching, error }] = useQuery({
    query: PRODUCT_QUERY,
    variables: { handle },
  })

  if (hasSizeVariants) {
    return (
      <>
        <Heading as="h5" sx={{ fontSize: 3 }} pb={4}>
          select a size
        </Heading>
        <Grid
          sx={{
            gridAutoFlow: 'column',
            gridColumn: 'max-content',
            gap: 2,
            pb: 3,
          }}
        >
          {variants.map((variant, i) => {
            const latestVariant = getLatestVariant(data, variant.shopifyId)
            console.log(latestVariant)
            return (
              <VariantOption
                key={`${variant.id}-option`}
                disabled={!latestVariant?.availableForSale}
                isSelected={variant.id === selectedVariant?.id}
                onClick={() => onSelect(variant)}
              >
                {
                  variant.selectedOptions.find(
                    opt => opt.name === 'Size' || opt.name === 'length'
                  )?.value
                }
              </VariantOption>
            )
          })}
        </Grid>
      </>
    )
  }
  return null
}

export default SizeVariants
