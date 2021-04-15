import React, { useContext, useState } from 'react'
import { Divider, Link, Button, Text, Flex, Box, Grid, Heading } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { useQuery, useMutation } from 'urql'
import { useProductTitle } from '../ProductTitle'
import { useFormattedPrice } from '../../hooks/utils'
import ProductReviewsTopline from './ProductReviewsTopline'
import MetalOptionSwatch from '../MetalOptionSwatch'
import VariantSize from './VariantSize'
import { StoreContext } from '../../contexts/StoreContext'
import { DrawerContext } from '../drawers'
import { AddCheckoutLineItem } from '../../mutations/cart'

const ProductDetails = ({
  title,
  description,
  variants,
  vendor,
  yotpoProductBottomline,
}) => {
  const [, setOpenDrawer] = useContext(DrawerContext)
  const [selectedVariant, setSelectedVariant] = useState(variants[0])
  const productTitle = useProductTitle(title)
  const productPrice = useFormattedPrice({
    amount: selectedVariant.priceNumber,
    currency: 'CAD',
  })

  const { checkoutId } = useContext(StoreContext)
  const [{ fetching }, addCheckoutLineItem] = useMutation(AddCheckoutLineItem)

  const metalOption = selectedVariant.selectedOptions.find(
    opt => opt.name === 'metal'
  )

  const hasSizeVariants = !!variants.find(variant =>
    variant.selectedOptions.find(opt => opt.name === 'Size')
  )

  const addToCart = async () => {
    addCheckoutLineItem({
      checkoutId,
      lineItems: [{ quantity: 1, variantId: selectedVariant.shopifyId }],
    }).then(() => {
      setOpenDrawer('cart')
    })
  }

  // get related metal options from sanity

  return (
    <Box sx={{ position: 'sticky', top: 0 }}>
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
          <Text sx={{ whiteSpace: 'nowrap', fontSize: 3 }}>{productPrice}</Text>
        </Grid>
        <ProductReviewsTopline
          score={yotpoProductBottomline?.averageScore}
          possibleScore={5}
          totalReviews={yotpoProductBottomline?.totalReview}
        />
      </Box>
      {metalOption && (
        <Box pt={4}>
          <Heading as="h5" sx={{ fontSize: 3 }}>
            {metalOption.value}
          </Heading>
          <Flex pt={2}>
            <MetalOptionSwatch metal={metalOption.value} />
          </Flex>
        </Box>
      )}
      <Box py={4}>
        {hasSizeVariants && (
          <>
            <Heading as="h5" sx={{ fontSize: 3 }} pb={4}>
              select a size
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
            disabled={fetching}
            type="button"
            onClick={addToCart}
            sx={{ flex: 1, fontSize: 1, py: 4 }}
          >
            Add To Cart
          </Button>
        </Flex>
      </Box>
      <Box py={4}>
        <Heading as="h5" sx={{ fontSize: 3 }}>
          description
        </Heading>
        <Box py={1}>
          <Text sx={{ lineHeight: 1.75, fontSize: 1, maxWidth: '70ch' }}>
            {description}
          </Text>
        </Box>
        <Box>
          <Text>
            by{' '}
            <Link as={GatsbyLink} to={`/shop/vendor/${vendor}`}>
              {vendor}
            </Link>
          </Text>
        </Box>
      </Box>
      <Box>link to collection</Box>
      <Box>model wearing thumbnails</Box>
    </Box>
  )
}

export default ProductDetails
