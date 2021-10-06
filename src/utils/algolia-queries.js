// const escapeStringRegexp ('escape-string-regexp')
import dotenv from 'dotenv'

dotenv.config({
  path: `.env`,
})

const productQuery = `
  {
    products: allShopifyProduct(
      filter: {
        availableForSale: { eq: true }
        productType: { nin: ["Insurance", "fee"] }
      }
    ) {
      nodes {
        id
        title
        productType
        handle
        availableForSale
        vendor
        images {
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
      }
    }
  }
`

function pageToAlgoliaRecord(node) {
  const { id: objectID, ...nodeRest } = node
  return {
    objectID,
    ...nodeRest,
  }
}
export const algoliaQueries = [
  {
    query: productQuery,
    transformer: ({ data }) => data.products.nodes.map(pageToAlgoliaRecord),
    indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
  },
]
