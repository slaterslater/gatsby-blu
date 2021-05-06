import React, { useMemo, useState } from 'react'
import { Link, Text, Box, Grid, Heading } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { useProductTitle } from '../ProductTitle'
import ProductReviewsTopline from './ProductReviewsTopline'
import AddToCart from './AddToCart'
import ShopifyHtml from '../ShopifyHtml'
import MetalOptions from './MetalOptions'
import ProductOptions from './ProductOptions'
import VariantPrice from './VariantPrice'
import Engraving from './Engraving'

const getInitialSelectedOptions = options =>
  options.reduce(
    (acc, el) => ({
      ...acc,
      [el.name]: el.values.length === 1 ? el.values[0] : null,
    }),
    {}
  )

const ProductDetails = ({
  options,
  title,
  descriptionHtml,
  variants,
  vendor,
  yotpoProductBottomline,
  alternates,
  tags,
  productType,
}) => {
  const [selectedOptions, setSelectedOptions] = useState(
    getInitialSelectedOptions(options)
  )

  const selectedVariant = useMemo(
    () =>
      variants.find(variant =>
        Object.keys(selectedOptions).reduce((acc, optionName) => {
          if (!acc) return false

          return variant.selectedOptions.find(
            variantOption => variantOption.value === selectedOptions[optionName]
          )
        }, true)
      ),
    [selectedOptions, variants]
  )

  const productTitle = useProductTitle(title)

  const [customAttributes, setCustomAttributes] = useState(null)

  return (
    <>
      <Box>
        <Grid
          sx={{
            gridTemplateColumns: '1fr max-content',
            alignItems: 'baseline',
            gap: 4,
          }}
          pb={3}
        >
          <Heading as="h1" sx={{ fontSize: 5 }}>
            {productTitle}
          </Heading>
          <Text sx={{ whiteSpace: 'nowrap', fontSize: 3 }}>
            <VariantPrice variant={selectedVariant || variants[0]} />
          </Text>
        </Grid>
        <ProductReviewsTopline
          score={yotpoProductBottomline?.averageScore}
          possibleScore={5}
          totalReviews={yotpoProductBottomline?.totalReview}
        />
      </Box>
      <MetalOptions product={{ variants }} alternates={alternates} />
      <Grid sx={{ gridAutoFlow: 'row', gap: 4 }} pt={5}>
        <ProductOptions
          options={options}
          onSelect={(name, value) =>
            setSelectedOptions(prev => ({ ...prev, [name]: value }))
          }
          selectedOptions={selectedOptions}
        />
        <Engraving
          onChange={attribute => setCustomAttributes([attribute])}
          tags={tags}
        />
      </Grid>
      <AddToCart
        productType={productType}
        tags={tags}
        variant={selectedVariant}
        customAttributes={customAttributes}
      />
      <Box>{/* <ProductCTACallout tags={tags} /> */}</Box>
      <Box py={4}>
        <ShopifyHtml dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
        <Box>
          <Text>
            by{' '}
            <Link as={GatsbyLink} to={`/shop/vendor/${vendor}`}>
              {vendor}
            </Link>
          </Text>
        </Box>
      </Box>
    </>
  )
}

export default ProductDetails
