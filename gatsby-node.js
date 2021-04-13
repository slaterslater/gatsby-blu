import path from 'path'

const decodeShopifyId = id => {
  const buff = Buffer.from(id, 'base64')
  const gid = buff.toString()
  const gidParts = gid.split('/')
  const [decodedId] = gidParts.slice(-1)
  return decodedId
}

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
      path: `/collections/${handle}`,
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
          shopifyId
        }
      }
    }
  `)

  data.allShopifyProduct.nodes.forEach(product => {
    const productId = decodeShopifyId(product.shopifyId)

    actions.createPage({
      // What is the URL for this new page??
      path: `shop/products/${product.handle}`,
      component: productTemplate,
      context: {
        handle: product.handle,
        productId,
      },
    })
  })
}

async function createBlogArticlePages({ graphql, actions }) {
  const component = path.resolve('./src/templates/BlogArticleTemplate.js')
  const { data } = await graphql(`
    {
      allShopifyArticle(
        sort: { fields: [publishedAt], order: DESC }
        filter: { blog: { title: { eq: "blog" } } }
      ) {
        nodes {
          handle
        }
      }
    }
  `)

  data.allShopifyArticle.nodes.forEach(article => {
    actions.createPage({
      path: `/blog/news/${article.handle}`,
      component,
      context: {
        handle: article.handle,
      },
    })
  })
}

async function createBlogPages({ graphql, actions }) {
  const component = path.resolve('./src/templates/BlogTemplate.js')

  const { data } = await graphql(`
    {
      allShopifyArticle(
        sort: { fields: [publishedAt], order: DESC }
        filter: { blog: { title: { eq: "blog" } } }
      ) {
        totalCount
      }
    }
  `)

  const perPage = 13
  const { totalCount } = data.allShopifyArticle
  const totalPages = Math.ceil(totalCount / perPage)

  // // paginated blog index pages
  Array(totalPages)
    .fill()
    .forEach((_, i) => {
      const skip = i * perPage
      const limit = perPage
      const currentPage = i + 1

      actions.createPage({
        path: `/blog/news/page-${currentPage}`,
        component,
        context: {
          skip,
          limit,
          currentPage,
        },
      })
    })

  // non-paginated first page
  actions.createPage({
    path: `/blog/news`,
    component,
    context: {
      skip: 0,
      limit: perPage,
      currentPage: 1,
    },
  })
}

export async function createPages(params) {
  // Create pages dynamically
  // Wait for all promises to be resolved before finishing this function
  await Promise.all([
    createProductTypeCollectionPages(params),
    createProductPages(params),
    createCollectionPages(params),
    createBlogPages(params),
    createBlogArticlePages(params),
  ])
}
