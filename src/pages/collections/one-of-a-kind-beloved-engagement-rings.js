import React, { useState } from 'react'
import { graphql } from 'gatsby'
import { useLocation } from '@reach/router'
import { useQuery } from 'urql'
import { Container, Grid, Link, Box, Text, Divider } from 'theme-ui'
import { parse } from 'qs'
import CollectionView, {
  getCollectionProducts,
} from '../../views/CollectionView'
import { COLLECTION_PAGE_QUERY } from '../../queries/collection'
import Layout from '../../components/layout'
import ResultsHeader from '../../components/collection/ResultsHeader'
import CollectionProductGroup from '../../components/CollectionProductGroup'
import { sortProducts } from '../../components/collection/CollectionProductGrid'
import CollectionProduct from '../../components/CollectionProduct'
import CollectionFilterAndSort from '../../components/collection/CollectionFilterAndSort'

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

const sortCollections = (nodes, arr) =>
  nodes.sort((a, b) => arr.indexOf(a.handle) - arr.indexOf(b.handle))

const OneOfAKindBelovedPage = ({ params: { handle }, path, data }) => {
  const location = useLocation()
  const currentParams = parse(location.search.replace('?', ''))

  const sortedCollections = sortCollections(data.allShopifyCollection.nodes, [
    'summer-light-collection',
    'new-horizon',
    'flower-moon-collection',
    'cosmic-love-one-of-a-kind-engagement-ring-collection',
    'love-letters-artist-cut-sapphire-one-of-a-kind-engagement-rings',
    'shades-of-blu',
  ])
  const allProducts = data.allShopifyCollection.nodes.flatMap(
    node => node.products
  )

  const sortedProducts = currentParams.sort
    ? sortProducts({ products: allProducts, sort: currentParams.sort })
    : null

  const [open, setOpen] = useState(false)

  return (
    <Layout>
      <Container as="main">
        <ResultsHeader
          title="one of a kind beloved engagement rings"
          description="our one of a kind engagement rings are designed and created around each stone that we source. we start with a story to build a theme, as we hand-select each stones for the rings in each collection."
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
                pageTitle="one of a kind beloved engagement rings"
                pagePath={path}
                {...collection}
              />
            ))}
          {sortedProducts && (
            <CollectionGroup
              pageTitle="one of a kind ebloved engagement rings"
              pagePath={path}
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

export default OneOfAKindBelovedPage

export const query = graphql`
  {
    allShopifyCollection(
      filter: {
        handle: {
          in: [
            "shades-of-blu"
            "flower-moon-collection"
            "summer-light-collection"
            "new-horizon"
            "love-letters-artist-cut-sapphire-one-of-a-kind-engagement-rings"
            "cosmic-love-one-of-a-kind-engagement-ring-collection"
          ]
        }
      }
    ) {
      nodes {
        title
        description
        handle
        image {
          src
          altText
          height
          width
        }
        products {
          availableForSale
          id
          handle
          title
          vendor
          images {
            originalSrc
            altText
            height
            width
            id
          }
          tags
          variants {
            priceV2 {
              amount
              currencyCode
            }
            presentmentPrices {
              edges {
                node {
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
          priceRange {
            minVariantPrice {
              currencyCode
              amount
            }
            maxVariantPrice {
              currencyCode
              amount
            }
          }
        }
      }
    }
  }
`
