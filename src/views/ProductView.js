import { Box, Container, Grid } from 'theme-ui'
import React from 'react'
import { pluralize } from 'inflected'
// import { GatsbyImage } from 'gatsby-plugin-image'
import { useLocation } from '@reach/router'
import { useProductTitle } from '../components/ProductTitle'
import ProductDetails from '../components/product/ProductDetails'
import ProductSocial from '../components/product/ProductSocial'
import Breadcrumbs from '../components/Breadcrumbs'
import ProductReviews from '../components/product/ProductReviews'
import ProductImageGallery from '../components/product/ProductImageGallery'
import ProductRecentRecommendations from '../components/product/ProductRecentRecommendations'

export const getProduct = product => ({
  ...product,
  images: product.images.edges.map(({ node }) => node),
  variants: product.variants.edges.map(({ node }) => ({
    ...node,
    shopifyId: node.id,
  })),
})

// const getCollectionTypePath =

const ProductView = ({
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
    availableForSale,
  },
  yotpoProductReview,
  yotpoProductQa,
  alternates,
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
              availableForSale={availableForSale}
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
          product_url: location?.href,
          product_image_url: images[0]?.originalSrc,
        }}
      />
    </Container>
  )
}

export default ProductView
