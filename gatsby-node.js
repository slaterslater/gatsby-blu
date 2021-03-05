import path from 'path'

async function createProductTypeCollectionPages({ graphql, actions }) {
  const component = path.resolve('./src/templates/ProductTypeCollection.js')
  // move this to sanity
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
async function createCollectionPages({ graphql, actions }) {
  const component = path.resolve('./src/templates/CollectionPageTemplate.js')
  // move this to sanity
  const { data } = await graphql(`
    query Collections {
      allShopifyCollection(
        filter: {
          handle: {
            nin: ["bracelets", "rings", "necklaces", "earrings", "all"]
          }
        }
      ) {
        nodes {
          handle
        }
      }
    }
  `)

  data.allShopifyCollection.nodes.forEach(({ handle }) => {
    actions.createPage({
      path: `/shop/collections/${handle}`,
      component,
      context: {
        handle,
      },
    })
  })
}

async function createProductPages({ graphql, actions }) {
  // 1. Get a template for this page
  const productTemplate = path.resolve('./src/templates/ProductPageTemplate.js')
  // 2. Query all pizzas
  const { data } = await graphql(`
    {
      allShopifyProduct(filter: { availableForSale: { eq: true } }) {
        nodes {
          handle
        }
      }
    }
  `)

  data.allShopifyProduct.nodes.forEach(product => {
    actions.createPage({
      // What is the URL for this new page??
      path: `shop/products/${product.handle}`,
      component: productTemplate,
      context: {
        handle: product.handle,
      },
    })
  })
}

export async function createPages(params) {
  // Create pages dynamically
  // Wait for all promises to be resolved before finishing this function
  await Promise.all([
    createProductTypeCollectionPages(params),
    createProductPages(params),
    createCollectionPages(params),
  ])
}
