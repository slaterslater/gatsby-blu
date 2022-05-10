/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useMemo } from 'react'
import { Grid } from 'theme-ui'
import { wrap } from '@popmotion/popcorn'
import { useQuery, gql } from 'urql'
import ProductReviewsTopline from './ProductReviewsTopline'
import AddToCart from './AddToCart'
import MetalOptions from './MetalOptions'
import ProductOptions from './options'
import Engraving from './Engraving'
import { ProductContext } from './ProductContext'
import { ProductSpecifications } from './ProductSpecifications'
import { EngagementConsultationButton } from './EngagementConsultationButton'
import { ProductDescription } from './ProductDescription'
import { ProductShipping } from './ProductShipping'
import { ProductTitleAndPrice } from './ProductTitleAndPrice'
import RelatedProducts from './RelatedProducts'
import ProductBadges from './ProductBadges'
import { CurrencyContext } from '../../contexts/CurrencyContext'

const getMetafieldValues = (metafields = []) => {
  const fields = {
    average: 'reviews_average',
    total: 'reviews_count',
    collectionHandle: 'related_product_collection',
  }

  Object.entries(fields).forEach(([key, value]) => {
    fields[key] = metafields.find(field => field.key === value)?.value
  })

  return fields
}

const ProductDetails = ({ alternates }) => {
  const { product } = useContext(ProductContext)
  const { currencyCode, setCurrency } = useContext(CurrencyContext)
  const { handle, metafields, tags } = product
  const { total, average, collectionHandle } = getMetafieldValues(metafields)

  const [{ data }] = useQuery({
    query: gql`
      query ($collectionHandle: String!) {
        collection(handle: $collectionHandle) {
          products(first: 250) {
            edges {
              node {
                handle
              }
            }
          }
        }
      }
    `,
    variables: { collectionHandle },
  })

  // USD tag sets currency
  useEffect(() => {
    const isUSD =
      tags.find(tag => tag.toUpperCase() === 'USD') && currencyCode !== 'USD'
    if (!isUSD) return
    setCurrency('USD')
  }, [])

  const related = useMemo(() => {
    // make an array of product handles
    const productHandles = data?.collection?.products?.edges
    if (!productHandles) return null
    // get index of handle
    const currentIndex = productHandles.findIndex(
      ({ node }) => node.handle === handle
    )
    // takes int n and returns n adjacent product handles
    const relatedHandles = n =>
      Array.from({ length: n }).map((_, i) => {
        // ensure related are in bounds
        const index = wrap(0, productHandles.length, currentIndex + i + 1)
        return productHandles[index]?.node?.handle
      })
    return relatedHandles(2)
  }, [handle, data])

  return (
    <Grid sx={{ gridAutoFlow: 'row', gap: 5 }}>
      <ProductTitleAndPrice />
      <MetalOptions alternates={alternates} />
      <ProductOptions />
      <Engraving />
      <AddToCart />
      <ProductShipping />
      <ProductDescription />
      <EngagementConsultationButton />
      <ProductBadges />
      <ProductSpecifications />
      <ProductReviewsTopline
        score={average}
        possibleScore={5}
        totalReviews={total}
      />
      <RelatedProducts related={related} />
    </Grid>
  )
}

export default ProductDetails
