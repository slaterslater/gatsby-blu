import React from 'react'
import { graphql } from 'gatsby'
import ProductTypeCollectionPage from '../../components/ProductTypeCollectionPage'
import Layout from '../../components/layout'

function ShopAllPage({ data }) {
  const { nodes, totalCount } = data.allShopifyProduct

  return (
    <Layout>
      <ProductTypeCollectionPage
        collectionTitle="Shop All Products"
        products={nodes}
        totalCount={totalCount}
      />
    </Layout>
  )
}

export default ShopAllPage

export const query = graphql`
  query ShopAllQuery {
    allShopifyProduct(
      filter: {
        availableForSale: { eq: true }
        productType: {
          in: ["Necklace", "Ring", "Bracelet", "Earring", "Wedding Ring"]
        }
      }
    ) {
      totalCount
      nodes {
        title
        description
        tags
        id
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        images {
          originalSrc
          altText
        }
      }
    }
  }
`
