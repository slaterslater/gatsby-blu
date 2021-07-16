import React, { useState } from 'react'
import { useLocation } from '@reach/router'
import { useQuery } from 'urql'
import { Container, Grid, Link, Box, Text } from 'theme-ui'
import { parse } from 'qs'
import Layout from '../components/layout'
import CollectionProductGroup from '../components/CollectionProductGroup'
import ResultsHeader from '../components/collection/ResultsHeader'
import CollectionView, { getCollectionProducts } from './CollectionView'
import { COLLECTION_PAGE_QUERY } from '../queries/collection'
import { sortProducts } from '../components/collection/CollectionProductGrid'
import CollectionProduct from '../components/CollectionProduct'
import CollectionFilterAndSort from '../components/collection/CollectionFilterAndSort'

const sortCollections = (nodes, arr) =>
  nodes.sort((a, b) => arr.indexOf(a.handle) - arr.indexOf(b.handle))

const CollectionGroup = ({
  pagePath,
  pageTitle,
  handle,
  title,
  description,
  products,
  ...props
}) => {
  const [{ data }] = useQuery({
    query: COLLECTION_PAGE_QUERY,
    variables: { handle },
  })

  const latestProducts = getCollectionProducts(
    data?.collectionByHandle.products
  )

  return (
    <CollectionProductGroup
      title={title}
      description={description}
      products={products}
      pt={6}
      pb={6}
      {...props}
    >
      {(latestProducts || products).map(product => (
        <CollectionProduct
          key={product.id}
          product={product}
          images={product.images}
          collectionTitle={pageTitle}
          collectionPath={pagePath}
        />
      ))}
    </CollectionProductGroup>
  )
}

const CollectionGroupsView = ({
  pageTitle,
  pageDescription,
  pagePath,
  collectionOrder,
  collections,
}) => {
  const location = useLocation()
  const currentParams = parse(location.search.replace('?', ''))

  const sortedCollections = sortCollections(collections, collectionOrder)
  const allProducts = collections.flatMap(node => node.products)

  const sortedProducts = currentParams.sort
    ? sortProducts({ products: allProducts, sort: currentParams.sort })
    : null

  const [open, setOpen] = useState(false)

  return (
    <Layout>
      <Container as="main">
        <ResultsHeader
          title={pageTitle}
          description={pageDescription}
          resultType="products"
          count={allProducts?.length || 0}
        >
          <Box sx={{ textAlign: 'right' }} pt={3}>
            <Text variant="caps" sx={{ fontSize: 0 }}>
              <Link
                role="button"
                sx={{ textDecoration: 'none', cursor: 'pointer' }}
                onClick={() => setOpen(prev => !prev)}
              >
                Filter &amp; Sort
              </Link>
            </Text>
          </Box>
        </ResultsHeader>
        <CollectionFilterAndSort isOpen={open} />
        <Grid>
          {!sortedProducts &&
            sortedCollections.map(collection => (
              <CollectionGroup
                pageTitle={pageTitle}
                pagePath={pagePath}
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
