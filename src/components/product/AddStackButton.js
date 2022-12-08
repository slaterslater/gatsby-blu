import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useContext, useMemo } from 'react'
import { Button, Flex, Box } from 'theme-ui'
import { useCart } from '../../hooks/cart'
import { useShopifyImage } from '../../hooks/shopifyImage'
import { ProductContext } from './ProductContext'

const ThumbnailImage = ({ image, alt = '' }) => {
  const imageData = useShopifyImage({ image, width: 80 })

  return (
    <Box mx={2}>
      <GatsbyImage image={imageData} alt={alt} />
    </Box>
  )
}

const AddStackButton = () => {
  const { disabled, addStackToCart } = useCart()
  const {
    product: { availableForSale, byAppointmentOnly },
    stack,
  } = useContext(ProductContext)

  const stackImages = useMemo(
    () =>
      stack?.map(({ title, images }) => ({
        alt: title,
        image: images[0],
      })),
    [stack]
  )

  const noStack =
    !stack?.length || !availableForSale || byAppointmentOnly?.value === 'true'

  if (noStack) return <></>

  const scrollToStack = () => {
    const recommendations = document.querySelector('#recommendations')
    const top = recommendations.offsetTop - 50
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <>
      <Button
        disabled={disabled}
        type="button"
        onClick={addStackToCart}
        sx={{
          flex: 1,
          fontSize: 1,
          py: 4,
          letterSpacing: 'widest',
          width: '100%',
        }}
        mt={1}
      >
        add stack
      </Button>
      <Flex
        onClick={scrollToStack}
        sx={{
          justifyContent: 'center',
          bg: 'prodBackground',
          height: 80,
          cursor: 'pointer',
        }}
        mt={1}
      >
        {stackImages?.map(({ image, alt }, i) => (
          <ThumbnailImage image={image} alt={alt} key={`stack-thumb-${i}`} />
        ))}
      </Flex>
    </>
  )
}

export default AddStackButton
