import React, { useContext, useState } from 'react'
import { Grid } from 'theme-ui'
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

const useYotpoTopline = (metafields = []) => {
  const { value: average } =
    metafields.find(field => field.key === 'reviews_average') || {}
  const { value: total } =
    metafields.find(field => field.key === 'reviews_count') || {}
  return { total, average }
}

const ProductDetails = ({ alternates }) => {
  const {
    product: { variants, metafields },
  } = useContext(ProductContext)

  const { total, average } = useYotpoTopline(metafields)

  const [customAttributes, setCustomAttributes] = useState(null)

  return (
    <>
      <Grid sx={{ gridAutoFlow: 'row', gap: 5 }}>
        <ProductTitleAndPrice />
        <MetalOptions product={{ variants }} alternates={alternates} />
        <ProductOptions />
        <Engraving onChange={attribute => setCustomAttributes([attribute])} />
        <AddToCart customAttributes={customAttributes} />
        <ProductShipping />
        <ProductDescription />
        <EngagementConsultationButton />
        <ProductSpecifications />
        <ProductReviewsTopline
          score={average}
          possibleScore={5}
          totalReviews={total}
        />
      </Grid>
    </>
  )
}

export default ProductDetails
