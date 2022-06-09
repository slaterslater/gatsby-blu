import React, { useContext } from 'react'
import { Text, Grid, Heading } from 'theme-ui'
import { useVariantPrice } from './VariantPrice'
import ProductTitle from '../ProductTitle'
import { ProductContext } from './ProductContext'

export const ProductTitleAndPrice = ({
  titleFontSize = 3,
  priceFontSize = 2,
}) => {
  const {
    product: { title, variants },
    selectedVariant,
  } = useContext(ProductContext)

  const variantPrice = useVariantPrice(selectedVariant || variants[0])

  return (
    <Grid
      sx={{
        gridTemplateColumns: '1fr max-content',
        alignItems: 'baseline',
        gap: 4,
      }}
    >
      <Heading
        as="h1"
        sx={{
          fontFamily: 'body',
          fontSize: titleFontSize,
          textTransform: 'lowercase',
          letterSpacing: 'widest',
          lineHeight: 1.5,
          color: 'black',
          fontWeight: 'medium',
        }}
      >
        <ProductTitle title={title} />
      </Heading>
      <Text
        id="price"
        sx={{
          letterSpacing: 'widest',
          fontWeight: 'body',
          whiteSpace: 'nowrap',
          lineHeight: 1,
          fontSize: priceFontSize,
        }}
      >
        {variantPrice}
      </Text>
    </Grid>
  )
}
