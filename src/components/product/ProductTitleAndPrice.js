import React, { useContext } from 'react'
import { Box, Text, Grid, Heading } from 'theme-ui'
import { useVariantPrice } from './VariantPrice'
import ProductTitle from '../ProductTitle'
import { ProductContext } from './ProductContext'
import { useProductMetalColor } from '../../hooks/product'

export const ProductTitleAndPrice = ({
  titleFontSize = 3,
  priceFontSize = 2,
}) => {
  const {
    product: { title, variants, options },
    selectedVariant,
  } = useContext(ProductContext)

  const productMetalColor = useProductMetalColor(options)
  const variantPrice = useVariantPrice(selectedVariant || variants[0])

  return (
    <Grid
      sx={{
        gridTemplateColumns: '1fr max-content',
        alignItems: 'baseline',
        gap: 4,
      }}
    >
      <Box>
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
        {productMetalColor && (
          <Heading
            as="h2"
            variant="copy"
            sx={{ lineHeight: 1, fontSize: 0, fontWeight: 'body' }}
            mt={1}
          >
            {productMetalColor}
          </Heading>
        )}
      </Box>
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
