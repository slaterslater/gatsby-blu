import React from 'react'
import { graphql } from 'gatsby'
import { pluralize } from 'inflected'
import CollectionPage from '../../templates/CollectionPage'
import Layout from '../../components/layout'

const groupProducts = products =>
  products.reduce((acc, el) => {
    const currentType = el.productType
    if (acc[currentType]) {
      return {
        ...acc,
        [currentType]: acc[currentType].concat(el),
      }
    }
    acc[currentType] = [el]
    return acc
  }, {})

function ShopAllPage({ data }) {
  // const { group: products } = data.allShopifyProduct
  // const productGroups = groupProducts(products)

  // const navigationLinks = Object.keys(productGroups).map(group => ({
  //   to: `/shop/all#${group}`,
  //   text: pluralize(group),
  // }))

  return (
    <Layout>
      {/* <CollectionPage */}
      {/*   collectionTitle="Shop All Products" */}
      {/*   productGroups={productGroups} */}
      {/*   navigationLinks={navigationLinks} */}
      {/* /> */}
    </Layout>
  )
}

export default ShopAllPage

// export const query = graphql`
//   query ShopAllQuery {
//     allShopifyProduct(
//       filter: {
//         availableForSale: { eq: true }
//         productType: {
//           in: ["Necklace", "Ring", "Bracelet", "Earring", "Wedding Ring"]
//         }
//       }
//     ) {
//       totalCount
//       nodes {
//         title
//         description
//         priceRange {
//           minVariantPrice {
//             amount
//             currencyCode
//           }
//         }
//         tags
//         id
//         images {
//           localFile {
//             childImageSharp {
//               fluid(maxWidth: 400) {
//                 ...GatsbyImageSharpFluid
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// `
