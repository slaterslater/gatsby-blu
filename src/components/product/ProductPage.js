import { Box, Container, Grid } from 'theme-ui'
import React from 'react'
import { pluralize } from 'inflected'
// import { GatsbyImage } from 'gatsby-plugin-image'
import { useProductTitle } from '../ProductTitle'
import ProductDetails from './ProductDetails'
import ProductSocial from './ProductSocial'
import Breadcrumbs from '../Breadcrumbs'
import RemoteShopifyImage from '../RemoteShopifyImage'
import ProductReviews from './ProductReviews'
import ProductImageGallery from './ProductImageGallery'

const ProductPage = ({
  product: {
    title,
    descriptionHtml,
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
    <Container>
      <Breadcrumbs
        pt={0}
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
        sx={{ gridTemplateColumns: ['1fr', '2fr 1fr'], columnGap: 6 }}
        pt={6}
      >
        <ProductImageGallery images={images} />

        <Box sx={{ position: 'relative' }}>
          <Box sx={{ position: 'sticky', top: 80 }}>
            <ProductDetails
              title={title}
              descriptionHtml={descriptionHtml}
              variants={variants}
              vendor={vendor}
              yotpoProductBottomline={yotpoProductReview.bottomline}
            />
            <ProductSocial
              title={title}
              description={description}
              image={images?.[0].originalSrc}
            />
          </Box>
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
          product_image_url: images[0]?.originalSrc,
        }}
      />
    </Container>
  )
}

export default ProductPage
