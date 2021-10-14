import React, { useState, useContext } from 'react'
import { Flex, Box, Grid } from 'theme-ui'
import { useQuery } from 'urql'
import ProductProvider, { ProductContext } from './ProductContext'
import Modal from '../Modal'
import AddToCart from './AddToCart'
import ProductOptions from './options'
import { useInitialProduct } from '../../hooks/product'
import { ProductTitleAndPrice } from './ProductTitleAndPrice'
import ThemeLink from '../app/ThemeLink'
import ProductModalGallery from './modal/gallery'

const ProductModal = ({ handle, children }) => {
  const initialProduct = useInitialProduct({ handle })
  const [isOpen, setOpen] = useState(false)

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
                <ProductOptions />
                <AddToCart
                  customAttributes={[]}
                  onAdded={() => setOpen(false)}
                />
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
