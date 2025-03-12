// export default {
//   articles: `
//     query GetArticles($first: Int!, $after: String) {
//       articles(first: $first, after: $after) {
//         pageInfo {
//           hasNextPage
//         }
//         edges {
//           cursor
//           node {
//             authorV2 {
//               bio
//               email
//               firstName
//               lastName
//               name
//             }
//             blog {
//               id
//             }
//             comments(first: 250) {
//               edges {
//                 node {
//                   author {
//                     email
//                     name
//                   }
//                   content
//                   contentHtml
//                   id
//                 }
//               }
//             }
//             content
//             contentHtml
//             excerpt
//             excerptHtml
//             id
//             handle
//             image {
//               altText
//               id
//               url
//               height
//               width
//             }
//             publishedAt
//             tags
//             title
//             onlineStoreUrl
//             seo {
//               title
//               description
//             }
//           }
//         }
//       }
//     }
//   `,
//   blogs: `
//     query GetBlogs($first: Int!, $after: String) {
//       blogs(first: $first, after: $after) {
//         pageInfo {
//           hasNextPage
//         }
//         edges {
//           cursor
//           node {
//             id
//             handle
//             title
//             onlineStoreUrl
//           }
//         }
//       }
//     }
//   `,
//   collections: `
//     query GetCollections($first: Int!, $after: String) {
//       collections(first: $first, after: $after) {
//         pageInfo {
//           hasNextPage
//         }
//         edges {
//           cursor
//           node {
//             description
//             descriptionHtml
//             seo {
//               title
//               description
//             }
//             handle
//             id
//             image {
//               altText
//               id
//               src
//               height
//               width
//             }
//             products(first: 250) {
//               edges {
//                 node {
//                   id
//                 }
//               }
//             }
//             title
//             updatedAt
//           }
//         }
//       }
//     }
//   `,
//   products: `
//     query GetProducts($first: Int!, $after: String) {
//       products(first: $first, after: $after) {
//         pageInfo {
//           hasNextPage
//         }
//         edges {
//           cursor
//           node {
//             availableForSale
//             createdAt
//             description
//             descriptionHtml
//             seo {
//               title
//               description
//             }
//             handle
//             id
//             images(first: 250) {
//               edges {
//                 node {
//                   id
//                   altText
//                   url
//                   height
//                   width
//                 }
//               }
//             }
//             onlineStoreUrl
//             options {
//               id
//               name
//               values
//             }
//             priceRangeV2: priceRange {
//               minVariantPrice {
//                 amount
//                 currencyCode
//               }
//               maxVariantPrice {
//                 amount
//                 currencyCode
//               }
//             }
//             productType
//             publishedAt
//             tags
//             title
//             updatedAt
//             variants(first: 250) {
//               edges {
//                 node {
//                   availableForSale
//                   compareAtPrice
//                   compareAtPriceV2 {
//                     amount
//                     currencyCode
//                   }
//                   id
//                   image {
//                     altText
//                     id
//                     url
//                     height
//                     width
//                   }
//                   price
//                   priceV2 {
//                     amount
//                     currencyCode
//                   }
//                   requiresShipping
//                   selectedOptions {
//                     name
//                     value
//                   }
//                   sku
//                   title
//                   weight
//                   weightUnit
//                 }
//               }
//             }
//             vendor
//           }
//         }
//       }
//     }
//   `,
//   shopPolicies: `
//     query GetPolicies {
//       shop {
//         privacyPolicy {
//           body
//           id
//           title
//           url
//         }
//         refundPolicy {
//           body
//           id
//           title
//           url
//         }
//         termsOfService {
//           body
//           id
//           title
//           url
//         }
//       }
//     }
//   `,
//   pages: `
//     query GetPages($first: Int!, $after: String) {
//       pages(first: $first, after: $after) {
//         pageInfo {
//           hasNextPage
//         }
//         edges {
//           cursor
//           node {
//             id
//             handle
//             title
//             body
//             bodySummary
//             updatedAt
//             onlineStoreUrl
//           }
//         }
//       }
//     }
//   `,
// }
