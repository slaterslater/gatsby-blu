import React, { useState, useEffect } from 'react'
import { Flex, Box, Grid } from 'theme-ui'
import { useQuery } from 'urql'
import ProductProvider from './ProductContext'
import Modal from '../Modal'
import AddToCart from './AddToCart'
import ProductOptions from './options'
import { useInitialProduct } from '../../hooks/product'
import { ProductTitleAndPrice } from './ProductTitleAndPrice'
import ThemeLink from '../app/ThemeLink'
import ProductModalGallery from './modal/gallery'
import WishlistButton from './WishlistButton'
import {
  formatMetalAlternatesFromMetafields,
  formatMetalAlternatesFromTags,
} from '../../lib/formatMetalAlternates'
import { ALTERNATES_QUERY } from '../../queries/product'
import MetalOptions from './MetalOptions'

const ProductModal = ({ handle, children }) => {
  const initialProduct = useInitialProduct({ handle })
  const [isOpen, setOpen] = useState(false)
  const [ids, setIds] = useState([])
  const [{ data: alternates }] = useQuery({
    query: ALTERNATES_QUERY,
    variables: { ids },
  })

  useEffect(() => {
    if (!initialProduct) return
    const alternatesFromTags = formatMetalAlternatesFromTags(
      initialProduct.tags || []
    )
    const alternatesFromMetafields = formatMetalAlternatesFromMetafields(
      initialProduct.metafields || []
    )
    const alternateIds =
      alternatesFromMetafields.length > 0
        ? alternatesFromMetafields
        : alternatesFromTags
    setIds(alternateIds)
  }, [initialProduct])

  return (
    <Box
      role="button"
      aria-pressed={isOpen}
      onClick={() => setOpen(prev => !prev)}
      sx={{ cursor: 'pointer' }}
    >
      {children}
      <Modal isOpen={isOpen} setOpen={setOpen} width={1100}>
        {initialProduct && (
          <ProductProvider handle={handle} initial={initialProduct}>
            <Grid
              gap={6}
              sx={{
                gridTemplateColumns: ['1fr', '1fr', '1fr minmax(280px, 410px)'],
              }}
            >
              <Box>
                <ProductModalGallery />
              </Box>
              <Grid sx={{ gap: 5, alignSelf: 'center' }}>
                <ProductTitleAndPrice />
                <MetalOptions
                  product={initialProduct}
                  alternates={alternates}
                />
                <ProductOptions />
                <Grid sx={{ gridTemplateColumns: '1fr 48px', gap: '1px' }}>
                  <AddToCart
                    customAttributes={[]}
                    onAdded={() => setOpen(false)}
                  />
                  <WishlistButton />
                </Grid>
                <Flex sx={{ justifyContent: 'center' }}>
                  <ThemeLink
                    to={`/products/${handle}`}
                    variant="caps"
                    sx={{ textDecoration: 'underline', fontWeight: 'medium' }}
                  >
                    View Full Details
                  </ThemeLink>
                </Flex>
              </Grid>
            </Grid>
          </ProductProvider>
        )}
      </Modal>
    </Box>
  )
}

export default ProductModal
