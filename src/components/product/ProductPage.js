import { Box, Container, Grid } from 'theme-ui'
import React from 'react'
import { pluralize } from 'inflected'
// import { GatsbyImage } from 'gatsby-plugin-image'
import { useLocation } from '@reach/router'
import { useProductTitle } from '../ProductTitle'
import ProductDetails from './ProductDetails'
import ProductSocial from './ProductSocial'
import Breadcrumbs from '../Breadcrumbs'
import { useShopifyImageMeta, useShopifyOgImage } from '../RemoteShopifyImage'
import ProductReviews from './ProductReviews'
import ProductImageGallery from './ProductImageGallery'
import ProductRecentRecommendations from './ProductRecentRecommendations'

// const getCollectionTypePath =

const ProductPage = ({
  product: {
    handle,
    options,
    title,
    descriptionHtml,
    description,
    productType,
    variants,
    vendor,
    images,
    tags,
  },
  yotpoProductReview,
  yotpoProductQa,
  alternates,
  productUrl,
}) => {
  const location = useLocation()
  const productTitle = useProductTitle(title)

  return (
    <Container pt={0}>
      <Breadcrumbs
        pt={[3, 6]}
        px={0}
        ml={[-2, 0]}
        currentPage={{ path: `/products/${handle}`, text: productTitle }}
        links={[
          {
            path: '/',
            text: 'Home',
          },
          {
            path:
              location?.state?.collectionPath ||
              `/collections/${pluralize(productType.toLowerCase())}`,
            text: location?.state?.collectionTitle || pluralize(productType),
          },
        ]}
      />
      <Grid
        sx={{
          gridTemplateColumns: ['1fr', '2fr minmax(280px, 1fr)'],
          columnGap: 6,
        }}
        pt={[1, 6]}
      >
        <ProductImageGallery images={images} />
        <Box sx={{ position: 'relative' }}>
          <Box sx={{ position: 'sticky', top: 80 }}>
            <ProductDetails
              title={title}
              descriptionHtml={descriptionHtml}
              variants={variants}
              vendor={vendor}
              yotpoProductBottomline={yotpoProductReview?.bottomline}
              alternates={alternates}
              productType={productType}
              options={options}
              tags={tags}
            />
            <ProductSocial
              title={title}
              description={description}
              image={images?.[0]?.originalSrc}
            />
          </Box>
        </Box>
      </Grid>
      <ProductRecentRecommendations tags={tags} />
      <ProductReviews
        yotpoProductReview={yotpoProductReview}
        yotpoProductQa={yotpoProductQa}
        yotpoProductDetails={{
          appkey: process.env.GATSBY_YOTPO_APP_KEY,
          product_title: title,
          sku: variants[0]?.sku,
          product_description: description,
          product_url: productUrl,
          product_image_url: images[0]?.originalSrc,
        }}
      />
    </Container>
  )
}

export default ProductPage
