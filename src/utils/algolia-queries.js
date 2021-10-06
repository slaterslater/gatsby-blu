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
  const tags = (node.tags || []).filter(tag => !tag.includes('__'))
  const images = (node.images || []).map(img => ({
    originalSrc: img.originalSrc,
    altText: img.altText,
  }))
  return {
    objectID: node.id,
    ...node,
    tags,
    images,
  }
}

export const algoliaQueries = [
  {
    query: productQuery,
    transformer: ({ data }) => data.products.nodes.map(pageToAlgoliaRecord),
    indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
  },
]
