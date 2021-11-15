import axios from 'axios'
import path from 'path'
import slugify from 'slugify'
import {
  formatMetalAlternatesFromTags,
  formatMetalAlternatesFromMetafields,
} from './src/lib/formatMetalAlternates'

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
          metafields {
            key
            value
          }
        }
      }
    }
  `)

  data.allShopifyProduct.nodes.forEach(product => {
    const productId = decodeShopifyId(product.shopifyId)
    const alternatesFromTags = formatMetalAlternatesFromTags(product.tags || [])
    const alternatesFromMetafields = formatMetalAlternatesFromMetafields(
      product.metafields || []
    )
    const alternates =
      alternatesFromMetafields.length > 0
        ? alternatesFromMetafields
        : alternatesFromTags

    actions.createPage({
      // What is the URL for this new page??
      path: `/products/${product.handle}`,
      component: productTemplate,
      context: {
        handle: product.handle,
        shopifyId: product.shopifyId,
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

  // const collectionHandles = data.allShopifyCollection.nodes.map(
  //   node => node.handle
  // )

  data.allShopifyCollection.nodes.forEach(collection => {
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

async function createPodcastIndexPages({ graphql, actions }) {
  const { data } = await graphql(`
    {
      allPodcast(filter: { episode_number: { gt: 0 } }) {
        totalCount
      }
    }
  `)
  if (!data) return
  const { totalCount } = data.allPodcast
  const limit = 6
  const totalPages = Math.ceil(totalCount / limit)
  //  paginated podcast index pages
  for (let i = 0; i < totalPages; i += 1) {
    actions.createPage({
      path: `/podcasts/${i + 1}`,
      component: path.resolve('./src/pages/podcasts.js'),
      context: {
        skip: i * limit,
        limit,
        currentPage: i + 1,
        totalPages,
      },
    })
  }
}

async function createPodcastEpisodePages({ graphql, actions }) {
  const { data } = await graphql(`
    {
      allPodcast(
        sort: { fields: published_at, order: ASC }
        filter: { episode_number: { gt: 0 } }
      ) {
        edges {
          node {
            slug
            id
          }
        }
        totalCount
      }
    }
  `)
  if (!data) return
  const { totalCount, edges: podcasts } = data.allPodcast
  // individual podcast pages
  for (let i = 0; i < totalCount; i += 1) {
    const slug = n => podcasts[n].node.slug
    actions.createPage({
      path: `/podcasts/${slug(i)}`,
      component: path.resolve('./src/templates/PodcastTemplate.js'),
      context: {
        id: podcasts[i].node.id,
        slug: slug(i),
        prev: i !== 0 ? slug(i - 1) : null,
        next: i !== totalCount - 1 ? slug(i + 1) : null,
      },
    })
  }
}

// fetch data from podcast api and create nodes from returned array
async function createPodcastNodes({ actions, createContentDigest }) {
  const url = `https://www.buzzsprout.com/api/${process.env.BUZZSPROUT_PODCAST_ID}/episodes.json`
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.BUZZSPROUT_API_TOKEN}`,
    },
  })
  if (res.data.length === 0) {
    const defaultValues = {
      id: 'PODCAST-DEFAULT',
      title: '',
      slug: '',
      audio_url: '',
      artwork_url: '',
      description: '',
      episode_number: 0,
      published_at: new Date().toISOString(),
    }
    actions.createNode({
      ...defaultValues,
      internal: {
        type: 'Podcast',
        contentDigest: createContentDigest(defaultValues),
      },
    })
    return
  }
  res.data.forEach(podcast => {
    // eslint-disable-next-line camelcase
    const { id, title, published_at } = podcast
    const slug = `${published_at.split('T')[0]}-${slugify(title)}` // ie 2021-10-04-shantel-clarke
    const nodeMeta = {
      id: String(id),
      slug,
      internal: {
        type: 'Podcast',
        contentDigest: createContentDigest(podcast),
      },
    }
    actions.createNode({
      ...podcast,
      ...nodeMeta,
    })
  })
}

export async function sourceNodes(params) {
  await Promise.all([createPodcastNodes(params)])
}

export async function createPages(params) {
  // Create pages dynamically
  // Wait for all promises to be resolved before finishing this function
  await Promise.all([
    createProductPages(params),
    createCollectionPages(params),
    createBlogPages(params),
    createCollectionGroupPages(params),
    createPodcastIndexPages(params),
    createPodcastEpisodePages(params),
  ])
}
