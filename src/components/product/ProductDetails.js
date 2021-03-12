import React, { useContext, useState } from 'react'
import { Link, Button, Text, Flex, Box, Grid, Heading } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { useProductTitle } from '../ProductTitle'
import { useFormattedPrice } from '../../hooks/utils'
import ProductReviewsTopline from './ProductReviewsTopline'
import MetalOptionSwatch from '../MetalOptionSwatch'
import VariantSize from './VariantSize'
import { StoreContext } from '../../contexts/StoreContext'

const ProductDetails = ({ title, description, variants, vendor }) => {
  const [loading, setLoading] = useState(false)
  const { addProductToCart } = useContext(StoreContext)
  const [selectedVariant, setSelectedVariant] = useState(variants[0])
  const productTitle = useProductTitle(title)
  const productPrice = useFormattedPrice({
    amount: selectedVariant.priceNumber,
    currency: 'CAD',
  })

  const metalOption = selectedVariant.selectedOptions.find(
    opt => opt.name === 'metal'
  )

  const hasSizeVariants = !!variants.find(variant =>
    variant.selectedOptions.find(opt => opt.name === 'Size')
  )

  const addToCart = async () => {
    setLoading(true)
    addProductToCart(selectedVariant.shopifyId).then(() => {
      setLoading(false)
    })
  }

  // get related metal options from sanity

  return (
    <Box sx={{ position: 'sticky', top: 0 }}>
      <Box variant="productDetailSection" pt={0}>
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
          <Text sx={{ whiteSpace: 'nowrap', fontSize: 3 }}>{productPrice}</Text>
        </Grid>
        <ProductReviewsTopline score={3.3} possibleScore={5} totalReviews={4} />
      </Box>
      {metalOption && (
        <Box variant="productDetailSection">
          <Heading as="h5" sx={{ fontSize: 3 }}>
            {metalOption.value}
          </Heading>
          <Flex pt={2}>
            <MetalOptionSwatch metal={metalOption.value} />
          </Flex>
        </Box>
      )}
      <Box variant="productDetailSection">
        {hasSizeVariants && (
          <>
            <Heading as="h5" sx={{ fontSize: 3 }} pb={4}>
              Select a size
            </Heading>
            <Grid
              sx={{
                gridAutoFlow: 'column',
                gridColumn: 'max-content',
                gap: 2,
                pb: 3,
              }}
            >
              {variants.map((variant, i) => (
                <VariantSize
                  value={
                    variant.selectedOptions.find(opt => opt.name === 'Size')
                      ?.value
                  }
                  isSelected={variant.id === selectedVariant.id}
                  onClick={() => setSelectedVariant(variants[i])}
                />
              ))}
            </Grid>
          </>
        )}
        <Button
          type="button"
          onClick={() => console.log('launch size modal')}
          sx={{
            bg: 'transparent',
            p: 0,
            color: 'gray',
            fontSize: 1,
            textTransform: 'none',
          }}
        >
          size guide
        </Button>
        <Flex pt={4}>
          <Button
            disabled={loading}
            type="button"
            onClick={addToCart}
            sx={{ flex: 1, fontSize: 1, py: 4 }}
          >
            Add To Cart
          </Button>
        </Flex>
      </Box>
      <Box variant="productDetailSection">
        <Heading as="h5" sx={{ fontSize: 3 }}>
          Details
        </Heading>
        <Box>
          <Box
            as="ul"
            sx={{
              lineHeight: 1.75,
              fontSize: 1,
              py: 1,
              px: 4,
              pb: 6,
            }}
          >
            <li>
              by{' '}
              <Link as={GatsbyLink} to={`/shop/vendor/${vendor}`}>
                {vendor}
              </Link>
            </li>
            <li>made in toronto</li>
            <li>recycled gold</li>
            <li>model wearing size 7</li>
            <li>this list is fixed</li>
            <li>other details from sanity</li>
          </Box>
        </Box>
        <Heading as="h5" sx={{ fontSize: 3 }}>
          Description
        </Heading>
        <Text
          sx={{ lineHeight: 1.75, fontSize: 1, maxWidth: '70ch', py: 1, px: 2 }}
        >
          {description}
        </Text>
      </Box>
      <Box>link to collection</Box>
      <Box>model wearing thumbnails</Box>
    </Box>
  )
}

export default ProductDetails
