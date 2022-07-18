import { Box, Container, Grid } from 'theme-ui'
import React from 'react'
import { pluralize } from 'inflected'
// import { GatsbyImage } from 'gatsby-plugin-image'
import { useLocation } from '@reach/router'
import { useProductTitle } from '../components/ProductTitle'
import ProductDetails from '../components/product/ProductDetails'
import ProductSocial from '../components/product/ProductSocial'
import { Breadcrumbs } from '../components/Breadcrumbs'
import ProductReviews from '../components/product/ProductReviews'
import ProductImageGallery from '../components/product/ProductImageGallery'
import ProductRecentRecommendations from '../components/product/ProductRecentRecommendations'
import ProductProvider from '../components/product/ProductContext'

// const getCollectionTypePath =

const ProductView = ({ product, alternates, badges, stack }) => {
  const location = useLocation()

  const {
    handle,
    title,
    descriptionHtml,
    description,
    productType,
    variants,
    vendor,
    images,
    tags,
  } = product

  const productTitle = useProductTitle(title)

  return (
    <ProductProvider
      initial={product}
      handle={product.handle}
      alternates={alternates}
      badges={badges}
      stack={stack}
    >
      <Container pt={0}>
        <Breadcrumbs
          pt={[3, 5]}
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
          <ProductImageGallery />
          <Box sx={{ position: 'relative' }}>
            <Box sx={{ position: 'sticky', top: 120 }}>
              <ProductDetails />
            </Box>
          </Box>
        </Grid>
        <ProductRecentRecommendations tags={tags} />
        <ProductReviews
          yotpoProductDetails={{
            appkey: process.env.GATSBY_YOTPO_APP_KEY,
            product_title: title,
            sku: variants[0]?.sku,
            product_description: description,
            product_url: location?.href,
            product_image_url: images[0]?.url,
          }}
        />
      </Container>
    </ProductProvider>
  )
}

export default ProductView
