/* eslint-disable react/prop-types */
import React, { useContext, useMemo, useState } from 'react'
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
import WishlistButton from './WishlistButton'

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
  const {
    product: { handle, variants, metafields },
  } = useContext(ProductContext)

  const { total, average, collectionHandle } = getMetafieldValues(metafields)

  const [customAttributes, setCustomAttributes] = useState(null)

  const [{ data }] = useQuery({
    query: gql`
      query ($collectionHandle: String!) {
        collectionByHandle(handle: $collectionHandle) {
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

  const related = useMemo(() => {
    // make an array of product handles
    const productHandles = data?.collectionByHandle?.products?.edges
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
    <>
      <Grid sx={{ gridAutoFlow: 'row', gap: 5 }}>
        <ProductTitleAndPrice />
        <MetalOptions product={{ variants }} alternates={alternates} />
        <ProductOptions />
        <Engraving onChange={attribute => setCustomAttributes([attribute])} />
        <Grid sx={{ gridTemplateColumns: '1fr 48px', gap: '1px' }}>
          <AddToCart customAttributes={customAttributes} />
          <WishlistButton />
        </Grid>
        <ProductShipping />
        <ProductDescription />
        <EngagementConsultationButton />
        <ProductSpecifications />
        <ProductReviewsTopline
          score={average}
          possibleScore={5}
          totalReviews={total}
        />
        <RelatedProducts related={related} />
      </Grid>
    </>
  )
}

export default ProductDetails
