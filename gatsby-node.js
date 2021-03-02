import path from 'path'

async function createProductTypeCollectionPages({ graphql, actions }) {
  const component = path.resolve('./src/templates/ProductTypeCollection.js')

  // move this to sanity eventually
  const { data } = await graphql(`
    {
      allProductTypeNavigationJson {
        nodes {
          path
          productType
        }
      }
    }
  `)

  data.allProductTypeNavigationJson.nodes.forEach(node => {
    actions.createPage({
      path: node.path,
      component,
      context: {
        productType: node.productType,
      },
    })
  })
}

// async function createProductPages({ graphql, actions }) {
//   // 1. Get a template for this page
//   const productTemplate = path.resolve('./src/templates/ProductPage.js')
//   // 2. Query all pizzas
//   const { data } = await graphql(`
//     {
//       allShopifyProduct {
//         edges {
//           nodes {
//             handle
//           }
//         }
//       }
//     }
//   `)

//   console.log(data)
//   // 3. Loop over each pizza and create a page for that pizza
//   data.allShopifyProduct.nodes.forEach(product => {
//     actions.createPage({
//       // What is the URL for this new page??
//       path: `products/${product.handle}`,
//       component: productTemplate,
//       context: {
//         handle: product.handle,
//       },
//     })
//   })
// }

export async function createPages(params) {
  // Create pages dynamically
  // Wait for all promises to be resolved before finishing this function
  await Promise.all([
    createProductTypeCollectionPages(params),
    // createProductPages(params),
  ])
}
