import React from 'react'
import { graphql } from 'gatsby'
import CollectionPage from '../../components/CollectionPage'
import Layout from '../../components/layout'

function ShopAllPage({ data }) {
  const { nodes, totalCount } = data.allShopifyProduct

  return (
    <Layout>
      <CollectionPage
        collectionTitle="Shop All Products"
        products={nodes}
        totalCount={totalCount}
      />
    </Layout>
  )
}

export default ShopAllPage

export const query = graphql`query ShopAllQuery {
  allShopifyProduct(
    filter: {availableForSale: {eq: true}, productType: {in: ["Necklace", "Ring", "Bracelet", "Earring", "Wedding Ring"]}}
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
        localFile {
          childImageSharp {
            gatsbyImageData(width: 400, layout: CONSTRAINED)
          }
        }
      }
    }
  }
}
`
