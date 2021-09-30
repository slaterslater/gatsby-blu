import path from 'path'
import { formatMetalAlternates } from './src/lib/formatMetalAlternates'

const decodeShopifyId = id => {
  const buff = Buffer.from(id, 'base64')
  const gid = buff.toString()
  const gidParts = gid.split('/')
  const [decodedId] = gidParts.slice(-1)
  return decodedId
}

async function createCollectionGroupPages({ graphql, actions }) {
  const collectionGroupTemplate = path.resolve(
    './src/templates/CollectionGroupPageTemplate.js'
  )

  const { data } = await graphql(`
    {
      allSanityCollectionGroupPage {
        nodes {
          id
          slug {
            current
          }
          collections {
            handle
          }
        }
      }
    }
  `)

  data.allSanityCollectionGroupPage.nodes.forEach(node => {
    actions.createPage({
      path: `/collections/${node.slug.current}`,
      component: collectionGroupTemplate,
      context: {
        collections: node.collections.map(col => col.handle),
        id: node.id,
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

async function createCollectionPages({ graphql, actions }) {
  const collectionTemplate = path.resolve(
    './src/templates/CollectionPageTemplate.js'
  )

  const { data } = await graphql(`
    {
      allShopifyCollection {
        nodes {
          handle
        }
      }
      allSanityCollectionGroupPage {
        nodes {
          slug {
            current
          }
        }
      }
    }
  `)

  const collectionGroupSlugs = data.allSanityCollectionGroupPage.nodes.map(
    node => node.slug.current
  )

  const collectionHandles = data.allShopifyCollection.nodes.map(
    node => node.handle
  )
  console.log('handles', collectionHandles)

  data.allShopifyCollection.nodes.forEach(collection => {
    if (collectionGroupSlugs.includes(collection.handle)) {
      console.log(collectionGroupSlugs, collection.handle)
    }
    if (!collectionGroupSlugs.includes(collection.handle)) {
      actions.createPage({
        // What is the URL for this new page??
        path: `/collections/${collection.handle}`,
        component: collectionTemplate,
        context: {
          handle: collection.handle,
        },
      })
    }
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
  await Promise.all([
    createProductPages(params),
    createCollectionPages(params),
    createBlogPages(params),
    createCollectionGroupPages(params),
  ])
}
