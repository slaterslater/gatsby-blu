// extends the default query to grab image height and width for gatsby image

export default {
  articles: `
    query GetArticles($first: Int!, $after: String) {
      articles(first: $first, after: $after) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            author {
              bio
              email
              firstName
              lastName
              name
            }
            blog {
              id
            }
            comments(first: 250) {
              edges {
                node {
                  author {
                    email
                    name
                  }
                  content
                  contentHtml
                  id
                }
              }
            }
            content
            contentHtml
            excerpt
            excerptHtml
            id
            handle
            image {
              altText
              id
              src
              height
              width
            }
            publishedAt
            tags
            title
            url
            seo {
              title
              description
            }
          }
        }
      }
    }
  `,
  blogs: `
    query GetBlogs($first: Int!, $after: String) {
      blogs(first: $first, after: $after) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            handle
            title
            url
          }
        }
      }
    }
  `,
  collections: `
    query GetCollections($first: Int!, $after: String) {
      collections(first: $first, after: $after) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            description
            descriptionHtml
            handle
            id
            image {
              altText
              id
              src
              height
              width
            }
            products(first: 250) {
              edges {
                node {
                  id
                }
              }
            }
            title
            updatedAt
          }
        }
      }
    }
  `,
  products: `
    query GetProducts($first: Int!, $after: String) {
      products(first: $first, after: $after) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            availableForSale
            createdAt
            description
            descriptionHtml
            handle
            id
            images(first: 250) {
              edges {
                node {
                  id
                  altText
                  originalSrc
                  height
                  width
                }
              }
            }
            metafields(first: 250) {
              edges {
                node {
                  description
                  id
                  key
                  namespace
                  value
                }
              }
            }
            onlineStoreUrl
            options {
              id
              name
              values
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            productType
            publishedAt
            tags
            title
            updatedAt
            variants(first: 250) {
              edges {
                node {
                  availableForSale
                  compareAtPrice
                  compareAtPriceV2 {
                    amount
                    currencyCode
                  }
                  id
                  image {
                    altText
                    id
                    originalSrc
                    height
                    width
                  }
                  metafields(first: 250) {
                    edges {
                      node {
                        description
                        id
                        key
                        namespace
                        value
                      }
                    }
                  }
                  price
                  priceV2 {
                    amount
                    currencyCode
                  }
                  requiresShipping
                  selectedOptions {
                    name
                    value
                  }
                  sku
                  title
                  weight
                  weightUnit
                  presentmentPrices(first: 250) {
                    edges {
                      node {
                        price {
                          amount
                          currencyCode
                        }
                        compareAtPrice {
                          amount
                          currencyCode
                        }
                      }
                    }
                  }
                }
              }
            }
            vendor
          }
        }
      }
    }
  `,
  shopPolicies: `
    query GetPolicies {
      shop {
        privacyPolicy {
          body
          id
          title
          url
        }
        refundPolicy {
          body
          id
          title
          url
        }
        termsOfService {
          body
          id
          title
          url
        }
      }
    }
  `,
  pages: `
    query GetPages($first: Int!, $after: String) {
      pages(first: $first, after: $after) {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            id
            handle
            title
            body
            bodySummary
            updatedAt
            url
          }
        }
      }
    }
  `,
}
