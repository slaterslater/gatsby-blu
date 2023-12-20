import React, { useContext } from 'react'
import { Box, Text, Grid, Heading, Flex } from 'theme-ui'
import { useVariantPrice, useVariantCompareAtPrice } from './VariantPrice'
import ProductTitle from '../ProductTitle'
import { ProductContext } from './ProductContext'
import { useProductMetalColor } from '../../hooks/product'

export const ProductTitleAndPrice = ({
  titleFontSize = 3,
  priceFontSize = 2,
}) => {
  const {
    product: { title, variants, options, metafields },
    selectedVariant,
  } = useContext(ProductContext)

  const variant = selectedVariant || variants[0]

  const productMetalColor = useProductMetalColor(options)
  const variantPrice = useVariantPrice(variant)
  const compareAtPrice = useVariantCompareAtPrice(variant)

  const byAppointmentOnly = metafields?.some(
    ({ key, value }) => key === 'appt_only' && value === 'true'
  )
  const price = byAppointmentOnly ? '' : variantPrice

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
      <Flex
        sx={{
          flexDirection: 'column',
          textAlign: 'right',
          '#price': {
            color: compareAtPrice ? 'error' : 'primary',
            letterSpacing: 'widest',
            fontWeight: 'body',
            whiteSpace: 'nowrap',
            lineHeight: 1,
            fontSize: priceFontSize,
          },
          '#compare': { textDecoration: 'line-through', marginBottom: 1 },
        }}
      >
        {compareAtPrice && <Text id="compare">{compareAtPrice}</Text>}
        <Text id="price">{price}</Text>
      </Flex>
    </Grid>
  )
}
