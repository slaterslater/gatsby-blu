import { Box, Grid } from 'theme-ui'
import React from 'react'
import { pluralize } from 'inflected'
// import { GatsbyImage } from 'gatsby-plugin-image'
import { useProductTitle } from '../ProductTitle'
import ProductDetails from './ProductDetails'
import Breadcrumbs from '../Breadcrumbs'
import RemoteShopifyImage from '../RemoteShopifyImage'

const ProductPage = ({
  product: { title, description, productType, variants, vendor, images },
  yotpoProductBottomline,
}) => {
  const productTitle = useProductTitle(title)
  return (
    <Box p={4} mx="auto" sx={{ maxWidth: 1680 }}>
      <Breadcrumbs
        currentPage={{ path: '', text: productTitle }}
        links={[
          {
            path: '/',
            text: 'Home',
          },
          {
            path: `/shop/${pluralize(productType.toLowerCase())}`,
            text: pluralize(productType),
          },
        ]}
      />
      <Grid
        sx={{ gridTemplateColumns: ['1fr', '2fr 1fr'], columnGap: 5 }}
        pt={6}
      >
        <Grid sx={{ gridTemplateColumns: '1fr 1fr', gridGap: 3 }}>
          {images.map(image => (
            <RemoteShopifyImage
              originalSrc={image.originalSrc}
              altText={image.altText}
              key={image.id}
            />
          ))}
        </Grid>
        <Box sx={{ position: 'relative' }}>
          <ProductDetails
            title={title}
            description={description}
            variants={variants}
            vendor={vendor}
            yotpoProductBottomline={yotpoProductBottomline}
          />
        </Box>
      </Grid>
    </Box>
  )
}

export default ProductPage
