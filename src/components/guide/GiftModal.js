import React, { useEffect, useState } from 'react'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { Box, useThemeUI, Button, Flex, Text, Grid } from 'theme-ui'
import { useInitialProduct, useProductGalleryImages } from '../../hooks/product'
import ElementSlider from '../ElementSlider'
import ProductProvider from '../product/ProductContext'
import { ProductTitleAndPrice } from '../product/ProductTitleAndPrice'
import ProductOptions from '../product/options'
import AddToCart from '../product/AddToCart'
import ThemeLink from '../app/ThemeLink'
import ShopifyGatsbyImage from '../ShopifyGatsbyImage'
import GiftProductGallery from './GiftProductGallery'

const MotionDialogOverlay = motion(DialogOverlay)
const MotionDialogContent = motion(DialogContent)
const MotionBox = motion(Box)

const GiftModal = ({
  justifyContent,
  modalWidth,
  handles,
  products,
  isOpen,
  setOpen,
  children,
}) => {
  const handleDismiss = () => setOpen(false)

  // const { collectionIndex, boxIndex } = useGiftContext()
  // const [handle, setHandle] = useState(handles[0])
  // const [handleIndex, setHandleIndex] = useState(0)

  // console.log(boxIndex)

  const [productIndex, setProductIndex] = useState(0)
  const product = products[productIndex]

  // console.log(product)
  // const initialProducts = handles.map(handle => useInitialProduct({ handle }))

  // const initialProduct = useInitialProduct({ handle: handles[handleIndex] })
  // console.log(`rendering ${productIndex}`)
  console.log('rendering giftmodal')
  return (
    <ProductProvider handle={product.handle} initial={product}>
      <AnimatePresence>
        {isOpen && (
          <MotionDialogOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onDismiss={handleDismiss}
            style={{
              zIndex: 11,
            }}
          >
            <Flex
              sx={{ width: '100%', maxWidth: 985, justifyContent }}
              mx="auto"
              px={[3]}
            >
              <MotionBox
                p={0}
                mx={[0, 3]}
                as={MotionDialogContent}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  min: 0,
                  max: 100,
                  bounceDamping: 9,
                  delay: '200ms',
                }}
                aria-label="Gift Guide products"
                sx={{
                  borderRadius: '3px',
                  minHeight: 420,
                  width: ['100%', `calc(${modalWidth} - 24px)`],
                  marginTop: [70, 105],
                }}
              >
                <Button
                  type="button"
                  variant="link"
                  onClick={handleDismiss}
                  // mt={4}
                  my={3}
                  px={5}
                  sx={{
                    textTransform: 'uppercase',
                    fontSize: 0,
                    fontWeight: 600,
                    letterSpacing: 'wider',
                    width: '100%',
                    textAlign: 'right',
                  }}
                >
                  done
                </Button>
                <Flex
                  mx="auto"
                  sx={{
                    justifyContent: 'center',
                    flexDirection: 'column',
                    maxWidth: ['100%', 365],
                  }}
                >
                  <GiftProductGallery
                    length={products.length}
                    currentIndex={productIndex}
                    setProductIndex={setProductIndex}
                    image={product.images[0].originalSrc}
                  />
                  <Grid
                    px={4}
                    my={5}
                    sx={{
                      gap: 5,
                      alignSelf: 'center',
                      width: '100%',
                      maxWidth: 400,
                    }}
                  >
                    <ProductTitleAndPrice titleFontSize={2} priceFontSize={1} />
                    {/* <MetalOptions product={{ variants }} alternates={alternates} /> */}
                    <ProductOptions />
                    <AddToCart
                      customAttributes={[]}
                      onAdded={() => setOpen(false)}
                    />
                    <Flex sx={{ justifyContent: 'center' }}>
                      <ThemeLink
                        to={`/products/${product.handle}`}
                        variant="caps"
                        sx={{
                          textDecoration: 'underline',
                          fontWeight: 'bold',
                        }}
                      >
                        View Full Details
                      </ThemeLink>
                    </Flex>
                  </Grid>
                </Flex>
              </MotionBox>
            </Flex>
          </MotionDialogOverlay>
        )}
      </AnimatePresence>
    </ProductProvider>
  )
}

GiftModal.defaultProps = {
  isOpen: false,
  setOpen: () => {},
  children: false,
}

export default GiftModal
