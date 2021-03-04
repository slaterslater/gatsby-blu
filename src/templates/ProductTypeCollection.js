import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import CollectionPageHeader from '../components/CollectionPageHeader'
import CollectionPage from '../components/CollectionPage'

const ProductTypeCollection = ({ data }) => {
  const { nodes, totalCount } = data.allShopifyProduct
  const { text } = data.productTypeNavigationJson

  return (
    <Layout>
      <CollectionPage products={nodes}>
        <CollectionPageHeader
          title={text}
          description="a longer bit of description text, soon to come from collection facets"
          mb={6}
        />
      </CollectionPage>
    </Layout>
  )
}

export default ProductTypeCollection

export const query = graphql`query ProductTypeCollection($productType: String!) {
  productTypeNavigationJson(productType: {eq: $productType}) {
    text
  }
  allShopifyProduct(
    filter: {productType: {eq: $productType}, availableForSale: {eq: true}}
  ) {
    totalCount
    nodes {
      handle
      description
      title
      id
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      tags
      id
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
