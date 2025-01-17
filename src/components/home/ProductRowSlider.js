import React from 'react'
import { Container } from 'theme-ui'
import { MobileSlider } from '../content/CollectionRow'
import CollectionProduct from '../CollectionProduct'

const ProductRowSlider = ({ products }) => {
  if (!products.length) return null
  return (
    <Container
      sx={{ maxHeight: 350 }}
      p={[0, 0, 0, 0]}
      // m={[0, 0, 0, 0]}
      mt={[5, 6]}
    >
      <MobileSlider
        minCardWidth={250}
        nodes={products.filter(Boolean).map(product => (
          <CollectionProduct product={product} images={[product.media[0].image]} />
        ))}
      />
    </Container>
  )
}

export default ProductRowSlider
