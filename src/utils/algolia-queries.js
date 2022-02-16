// const escapeStringRegexp ('escape-string-regexp')
import dotenv from 'dotenv'

dotenv.config({
  path: `.env`,
})

const productQuery = `
  {
    products: allShopifyProduct(
      filter: {productType: {nin: ["Insurance", "fee"]}, tags: {ne: "hidden"}}
    ) {
      nodes {
        id
        title
        productType
        handle
        availableForSale
        vendor
        images {
          id
          originalSrc
          altText
          height
          width
        }
        tags
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
        variants {
          priceV2 {
            amount
            currencyCode
          }
        }
      }
    }
  }
`

function pageToAlgoliaRecord(node) {
  return {
    objectID: node.id,
    ...node,
  }
}

export const algoliaQueries = [
  {
    query: productQuery,
    transformer: ({ data }) => data.products.nodes.map(pageToAlgoliaRecord),
    indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
  },
]
