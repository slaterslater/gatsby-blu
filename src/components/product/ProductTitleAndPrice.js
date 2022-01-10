import React, { useContext } from 'react'
import { Link, Text, Box, Grid, Heading } from 'theme-ui'
import VariantPrice from './VariantPrice'
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
        sx={{
          letterSpacing: 'widest',
          ontWeight: 'body',
          whiteSpace: 'nowrap',
          lineHeight: 1,
          fontSize: priceFontSize,
        }}
      >
        <VariantPrice variant={selectedVariant || variants[0]} />
      </Text>
    </Grid>
  )
}
