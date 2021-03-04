import { Text, Flex, Box, Grid, Heading } from 'theme-ui'
import React, { useState } from 'react'
import { pluralize } from 'inflected'
import { GatsbyImage } from "gatsby-plugin-image";
import { useProductTitle } from '../ProductTitle'
import ProductDetails from './ProductDetails'
import Breadcrumbs from '../Breadcrumbs'

const ProductPage = ({
  product: { title, description, productType, variants, vendor, images },
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
            <GatsbyImage
              image={image.localFile.childImageSharp.gatsbyImageData}
              alt={image.altText} />
          ))}
        </Grid>
        <Box sx={{ position: 'relative' }}>
          <ProductDetails
            title={title}
            description={description}
            variants={variants}
            vendor={vendor}
          />
        </Box>
      </Grid>
    </Box>
  );
}

export default ProductPage
