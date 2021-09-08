import React, { useContext, useState } from 'react'
import { Link, Text, Box, Grid, Heading } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import ProductTitle from '../ProductTitle'
import ProductReviewsTopline from './ProductReviewsTopline'
import AddToCart from './AddToCart'
import ShopifyHtml from '../ShopifyHtml'
import MetalOptions from './MetalOptions'
import ProductOptions from './ProductOptions'
import VariantPrice from './VariantPrice'
import Engraving from './Engraving'
import { ProductContext } from './ProductContext'

const ProductDetails = ({ yotpoProductBottomline, alternates }) => {
  const {
    product: { options, title, descriptionHtml, variants, vendor, tags },
    selectedVariant,
    selectedOptions,
    selectOption,
  } = useContext(ProductContext)

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
            <ProductTitle title={title} />
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
          onSelect={selectOption}
          selectedOptions={selectedOptions}
        />
        <Engraving
          onChange={attribute => setCustomAttributes([attribute])}
          tags={tags}
        />
      </Grid>
      <AddToCart customAttributes={customAttributes} />
      <Box py={4}>
        <ShopifyHtml dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
        <Box>
          <Text>
            by{' '}
            <Link as={GatsbyLink} to={`/collections/${vendor}`}>
              {vendor}
            </Link>
          </Text>
        </Box>
      </Box>
    </>
  )
}

export default ProductDetails
