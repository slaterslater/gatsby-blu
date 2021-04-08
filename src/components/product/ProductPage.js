import { Box, Grid } from 'theme-ui'
import React from 'react'
import { pluralize } from 'inflected'
// import { GatsbyImage } from 'gatsby-plugin-image'
import { useProductTitle } from '../ProductTitle'
import ProductDetails from './ProductDetails'
import Breadcrumbs from '../Breadcrumbs'
import RemoteShopifyImage from '../RemoteShopifyImage'
import ProductReviews from './ProductReviews'

const ProductPage = ({
  product: {
    title,
    description,
    productType,
    variants,
    vendor,
    images,
    onlineStoreUrl,
  },
  yotpoProductReview,
  yotpoProductQa,
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
            yotpoProductBottomline={yotpoProductReview.bottomline}
          />
        </Box>
      </Grid>
      <ProductReviews
        yotpoProductReview={yotpoProductReview}
        yotpoProductQa={yotpoProductQa}
        yotpoProductDetails={{
          appkey: process.env.GATSBY_YOTPO_APP_KEY,
          product_title: title,
          sku: variants[0]?.sku,
          product_description: description,
          product_url: onlineStoreUrl,
          product_image_url: images[0].originalSrc,
        }}
      />
    </Box>
  )
}

export default ProductPage
