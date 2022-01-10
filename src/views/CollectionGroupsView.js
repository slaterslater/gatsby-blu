import React, { useState } from 'react'
import { useLocation } from '@reach/router'
import { useQuery } from 'urql'
import { Container, Grid, Link, Box, Text, Flex } from 'theme-ui'
import { GatsbyImage } from 'gatsby-plugin-image'
import { parse } from 'qs'
import Layout from '../components/layout'
import CollectionProductGroup from '../components/CollectionProductGroup'
import ResultsHeader from '../components/collection/ResultsHeader'
import CollectionView, { getCollectionProducts } from './CollectionView'
import { COLLECTION_PAGE_QUERY } from '../queries/collection'
import { sortProducts } from '../components/collection/CollectionProductGrid'
import CollectionProduct from '../components/CollectionProduct'
import CollectionFilterAndSort from '../components/collection/CollectionFilterAndSort'
import CollectionPageHeader from '../components/CollectionPageHeader'
import ThemeLink from '../components/app/ThemeLink'
import { useShopifyImage } from '../hooks/shopifyImage'
import LongArrowRight from '../components/icon/long-arrow-right'
import SEO from '../components/seo'

const sortCollections = (nodes, arr) =>
  nodes.sort((a, b) => arr.indexOf(a.handle) - arr.indexOf(b.handle))

const AllCollectionThumbnailLink = ({ to, image, moreProductCount }) => {
  const imageData = useShopifyImage({ image, width: 360 })

  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <Grid>
        <ThemeLink
          to={to}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            bg: 'rgba(249, 248, 246, .2)',
            gridArea: '1 / 1 / -1 / -1',
            zIndex: 10,
            color: 'white',
            textDecoration: 'none',
            textTransform: 'uppercase',
            fontSize: 0,
            letterSpacing: 'widest',
            fontWeight: '500',
          }}
        >
          <Box my={3} px={3} py={2} sx={{ bg: 'white', color: 'white' }}>
            <Text variant="caps" sx={{ color: 'primary', fontSize: 9 }}>
              view {moreProductCount} more
            </Text>
          </Box>
          <Box sx={{ height: 0 }}>
            <LongArrowRight />
          </Box>
        </ThemeLink>
        <Box
          sx={{
            gridArea: '1 / 1 / -1 / -1',
          }}
        >
          <GatsbyImage image={imageData} alt={image.altText || ''} />
        </Box>
      </Grid>
      <Box sx={{ flex: 1 }} />
    </Flex>
  )
}

const CollectionGroup = ({
  pagePath,
  pageTitle,
  handle,
  title,
  description,
  products,
  isTruncated,
  ...props
}) => {
  const [{ data }] = useQuery({
    query: COLLECTION_PAGE_QUERY,
    variables: { handle },
  })

  const latestProducts = getCollectionProducts(
    data?.collectionByHandle.products
  )

  const allProducts = latestProducts || products
  const collectionProducts = isTruncated ? allProducts.slice(0, 4) : allProducts

  return (
    <CollectionProductGroup
      title={title}
      description={description}
      products={products}
      pt={6}
      pb={6}
      {...props}
    >
      {collectionProducts.map((product, i) => {
        if (isTruncated && i + 1 === collectionProducts.length) {
          return (
            <AllCollectionThumbnailLink
              key={product.id}
              to={`/collections/${handle}`}
              image={product.images[1] || product.images[0]}
              moreProductCount={allProducts.length - 3}
            />
          )
        }

        return (
          <CollectionProduct
            key={product.id}
            product={product}
            images={product.images}
            collectionTitle={pageTitle}
            collectionPath={pagePath}
          />
        )
      })}
    </CollectionProductGroup>
  )
}

const CollectionGroupsView = ({
  pageTitle,
  pageDescription,
  pagePath,
  collectionOrder,
  collections,
  isTruncated,
  seoGatsbyImage,
  headerImage,
}) => {
  const location = useLocation()
  const currentParams = parse(location.search.replace('?', ''))

  const sortedCollections = sortCollections(collections, collectionOrder)
  const allProducts = collections.flatMap(node => node.products)

  const sortedProducts = currentParams.sort
    ? sortProducts({ products: allProducts, sort: currentParams.sort })
    : null

  return (
    <Layout>
      <SEO
        title={pageTitle}
        description={pageDescription}
        gatsbyImage={seoGatsbyImage}
      />
      <CollectionPageHeader
        title={pageTitle}
        description={pageDescription}
        image={headerImage}
      />
      <Container pt={0} as="main">
        <CollectionFilterAndSort
          title={pageTitle}
          productCount={allProducts.length}
        />
        <Grid>
          {!sortedProducts &&
            sortedCollections.map(collection => (
              <CollectionGroup
                pageTitle={pageTitle}
                pagePath={pagePath}
                isTruncated={isTruncated}
                {...collection}
              />
            ))}
          {sortedProducts && (
            <CollectionGroup
              pageTitle={pageTitle}
              pagePath={pagePath}
              title=""
              description=""
              products={sortedProducts}
            />
          )}
        </Grid>
      </Container>
    </Layout>
  )
}

export default CollectionGroupsView
