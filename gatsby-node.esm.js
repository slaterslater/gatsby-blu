import path from 'path'
import { formatMetalAlternates } from './src/lib/formatMetalAlternates'

const decodeShopifyId = id => {
  const buff = Buffer.from(id, 'base64')
  const gid = buff.toString()
  const gidParts = gid.split('/')
  const [decodedId] = gidParts.slice(-1)
  return decodedId
}

async function createProductPages({ graphql, actions }) {
  // 1. Get a template for this page
  const productTemplate = path.resolve('./src/templates/ProductPageTemplate.js')
  // 2. Query all pizzas
  const { data } = await graphql(`
    {
      allShopifyProduct {
        nodes {
          handle
          shopifyId
          tags
        }
      }
    }
  `)

  data.allShopifyProduct.nodes.forEach(product => {
    const productId = decodeShopifyId(product.shopifyId)
    const alternates = formatMetalAlternates(product.tags || [])

    actions.createPage({
      // What is the URL for this new page??
      path: `/products/${product.handle}`,
      component: productTemplate,
      context: {
        handle: product.handle,
        productId,
        alternates,
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

  //  paginated blog index pages
  Array(totalPages)
    .fill()
    .forEach((_, i) => {
      const skip = i * perPage
      const limit = perPage
      const currentPage = i + 1

      actions.createPage({
        path: `/blogs/news/page-${currentPage}`,
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
    path: `/blogs/news`,
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
  await Promise.all([createProductPages(params), createBlogPages(params)])
}
