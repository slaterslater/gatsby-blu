import axios from 'axios'
import { gql, GraphQLClient } from 'graphql-request'
import path from 'path'
import slugify from 'slugify'
import dayjs from 'dayjs'
import {
  formatMetalAlternatesFromTags,
  formatMetalAlternatesFromMetafields,
} from './src/lib/formatMetalAlternates'
import { logBadGiftGuideData } from './src/lib/logBadGiftGuideData'

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
    const handle = node.slug.current
    actions.createPage({
      path: `/collections/${handle}`,
      component: collectionGroupTemplate,
      context: {
        collections: node.collections.map(col => col.handle),
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
      allSanityProductBadge {
        nodes {
          name
        }
      }
    }
  `)
  const badgeNames = data.allSanityProductBadge.nodes.map(badge => badge.name)
  const products = data.allShopifyProduct.nodes
  products.forEach(product => {
    const alternatesFromTags = formatMetalAlternatesFromTags(product.tags || [])
    const alternatesFromMetafields = formatMetalAlternatesFromMetafields(
      product.metafields || []
    )
    const alternates =
      alternatesFromMetafields.length > 0
        ? alternatesFromMetafields
        : alternatesFromTags

    const hasTag = value =>
      product.tags.some(tag => tag.toLowerCase() === value)

    // pass hidden context to hide product page from google...
    // const hidden = product.tags.includes('hidden')
    const hidden = hasTag('hidden')

    // beloved
    const isOOAK = product.tags.some(tag => tag.match(/one.*of.*a.*kind/i))
    const isBeloved = hasTag('beloved') || isOOAK
    // const isBeloved = hasTag('beloved')

    // get badges
    const badges = badgeNames.filter(name =>
      product.tags.some(tag => {
        const stripped = s => s.toLowerCase().replace(/[\s-]/g, '')
        return stripped(name) === stripped(tag)
      })
    )

    // get stackWith Ids
    const [stackWithField] = product.metafields.filter(
      field => field.key === 'stack_with'
    )
    const stackWithIds = stackWithField
      ? JSON.parse(stackWithField.value)
      : product.tags
          .filter(tag => tag.includes('__with'))
          .map(tag => {
            const handle = tag.split(':')[1]
            const stackProduct = products.find(p => p.handle === handle)
            return stackProduct ? stackProduct.shopifyId : ''
          })

    // get contemplation card
    const card = product.metafields.find(({ key }) => key === 'card')
    // return card ? regex matching case insensitive title : pattern that always fails
    const cardTitleExp = card ? `/${JSON.parse(card.value)[0]}/i` : '/^\b$/'

    const [productIdentifier] = product.shopifyId.match(/\d+$/)

    actions.createPage({
      path: `/products/${product.handle}`,
      component: productTemplate,
      context: {
        handle: product.handle,
        shopifyId: product.shopifyId,
        alternates,
        hidden,
        badges,
        stackWithIds,
        cardTitleExp,
        productIdentifier,
        isBeloved,
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
          metafields {
            key
            value
          }
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

  data.allShopifyCollection.nodes.forEach(({ handle, metafields }) => {
    const isGroupPage = collectionGroupSlugs.includes(handle)
    const isHidden = metafields.some(
      ({ key, value }) => key === 'hidden' && value === 'true'
    )

    if (isHidden || isGroupPage) return
    actions.createPage({
      path: `/collections/${handle}`,
      component: collectionTemplate,
      context: {
        handle,
      },
    })
  })
}

async function createBlogPages({ graphql, actions }) {
  const component = path.resolve('./src/templates/BlogTemplate.js')

  const { data } = await graphql(`
    {
      allShopifyArticle(
        sort: { fields: [publishedAt], order: DESC } # filter: { blog: { title: { eq: "blog" } } }
      ) {
        totalCount
      }
    }
  `)

  const perPage = 12
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
        // id: podcasts[i].node.id,
        slug: slug(i),
        prev: i !== 0 ? slug(i - 1) : null,
        next: i !== totalCount - 1 ? slug(i + 1) : null,
      },
    })
  }
}

async function createGiftGuidePages({ graphql, actions }) {
  const { data } = await graphql(`
    {
      allSanityGiftGuide {
        nodes {
          handle {
            current
          }
          giftCollections {
            handle
            giftBoxes {
              products {
                productHandles
              }
            }
          }
        }
      }
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
  const guides = data.allSanityGiftGuide.nodes
  const allShopifyProducts = data.allShopifyProduct.nodes
  if (guides.length === 0) return
  guides.forEach(guide => {
    const {
      handle: { current: guideHandle },
      giftCollections,
    } = guide
    // get all product handles
    const handles = giftCollections.reduce(
      (allGiftBoxes, { giftBoxes }) =>
        allGiftBoxes.concat(
          giftBoxes.reduce(
            (allProducts, { products }) =>
              allProducts.concat(
                products.reduce(
                  (allProductHandles, { productHandles }) =>
                    allProductHandles.concat(productHandles),
                  []
                )
              ),
            []
          )
        ),
      []
    )

    // get products
    const badHandles = []
    const allHandles = handles.filter(handle => {
      const found = allShopifyProducts.find(
        product => product.handle === handle
      )
      if (!found) badHandles.push(handle)
      return !!found
    })
    // log any handles that can't be found
    logBadGiftGuideData(badHandles, guideHandle, giftCollections)

    // get alternates
    const alternates = allHandles.reduce((allAlternates, product) => {
      if (!product) return allAlternates
      const alternatesFromTags = formatMetalAlternatesFromTags(
        product.tags || []
      )
      const alternatesFromMetafields = formatMetalAlternatesFromMetafields(
        product.metafields || []
      )
      const moreAlternates =
        alternatesFromMetafields.length > 0
          ? alternatesFromMetafields
          : alternatesFromTags
      return allAlternates.concat(moreAlternates)
    }, [])

    actions.createPage({
      path: `/${guideHandle}`,
      component: path.resolve('./src/templates/GiftGuideTemplate.js'),
      context: {
        guideHandle,
        collections: giftCollections.map(({ handle }) => handle),
        products: handles,
        alternates,
      },
    })
  })
}

async function createHomePage({ graphql, actions }) {
  const { data } = await graphql(`
    {
      sanityHomePage {
        headerHero {
          heading
          subheading
          button {
            text
            path
          }
          image1 {
            asset {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
          imageMobile {
            asset {
              gatsbyImageData(placeholder: BLURRED, width: 500)
            }
          }
        }
        video {
          mobileVideo {
            asset {
              url
            }
          }
          desktopVideo {
            asset {
              url
            }
          }
        }
        innerHero {
          heading
          subheading
          button {
            text
            path
          }
          image1 {
            asset {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
          imageMobile {
            asset {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
        }
        popup {
          title
          path
          timeout
          image {
            asset {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
        }
        productRow {
          title
          handle
        }
        collectionRow {
          title
          handle
          image {
            asset {
              gatsbyImageData(placeholder: BLURRED, width: 300)
            }
          }
        }
        spotlights {
          button {
            text
            path
          }
          image {
            asset {
              gatsbyImageData(placeholder: BLURRED, width: 500)
            }
          }
        }
        reviews {
          author
          content
          score
          productHandle
          productTitle
        }
        zodiac {
          name
          description
          collectionHandle
          backgroundColor {
            hex
          }
          image {
            asset {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
        }
      }
      allShopifyCollection {
        nodes {
          handle
          title
        }
      }
      allSanityCollectionGroupPage {
        nodes {
          title
          slug {
            current
          }
        }
      }
      allShopifyProduct {
        nodes {
          title
          handle
          tags
          images {
            gatsbyImageData(placeholder: BLURRED, width: 300)
          }
          priceRangeV2 {
            minVariantPrice {
              amount
            }
            maxVariantPrice {
              amount
            }
          }
        }
      }
      allSanityLocation(
        filter: { isPopup: { ne: true }, isTempClosed: { ne: true } }
      ) {
        nodes {
          id
          name
          slug {
            current
          }
          storeImage {
            asset {
              gatsbyImageData(placeholder: BLURRED, width: 200)
            }
          }
        }
      }
      allSanityCard {
        nodes {
          id
          collectionHandle
          image {
            asset {
              gatsbyImageData(placeholder: BLURRED, width: 155)
            }
          }
        }
      }
    }
  `)
  if (!data) return
  // const homepage = data.allSanityHomePage.nodes[0]
  const products = data.allShopifyProduct.nodes
  const collections = data.allShopifyCollection.nodes
  const collectionGroupPages = data.allSanityCollectionGroupPage.nodes
  // const { productRow, collectionRow, reviews } = data.allSanityHomePage.nodes[0]
  const { headerHero, video, popup, innerHero, spotlights, zodiac } =
    data.sanityHomePage

  const collectionRow = data.sanityHomePage.collectionRow
    .map(collection => {
      if (collection.title) return collection
      const collectionData = collections.find(
        ({ handle }) => handle === collection.handle
      )
      const collectionGroupPage = collectionGroupPages.find(
        ({ slug }) => slug.current === collection.handle
      )
      return {
        ...collection,
        ...collectionData,
        ...collectionGroupPage,
      }
    })
    .filter(collection => !!collection)

  const reviews = data.sanityHomePage.reviews
    .map(review => {
      const productData = products.find(
        ({ handle }) => handle === review.productHandle
      )
      return {
        ...review,
        product: {
          ...productData,
          title: review.productTitle || productData.title,
        },
      }
    })
    .filter(({ product }) => product.handle)

  const productRow = data.sanityHomePage.productRow
    .map(({ handle }) => products.find(product => handle === product.handle))
    .filter(product => !!product)

  actions.createPage({
    path: `/`,
    component: path.resolve('./src/templates/HomePageTemplate.js'),
    context: {
      collectionRow,
      productRow,
      reviews,
      headerHero: headerHero[0],
      secondHero: headerHero[1],
      video: video[0],
      popup: popup[0],
      zodiac: zodiac[0],
      innerHero,
      spotlights,
      locations: data.allSanityLocation.nodes,
      cards: data.allSanityCard.nodes,
    },
  })
}

async function createLocationPages({ graphql, actions }) {
  const { data } = await graphql(`
    {
      allSanityLocation(filter: { isPopup: { ne: true } }) {
        nodes {
          slug {
            current
          }
        }
      }
    }
  `)

  data.allSanityLocation.nodes.forEach(node => {
    // if (node)
    const slug = node.slug.current
    const component = path.resolve('./src/templates/LocationPageTemplate.js')
    actions.createPage({
      path: `/locations/${slug}`,
      component,
      context: {
        slug,
      },
    })
  })
}

// build pages that redirect to another
async function createRedirectPages({ graphql, actions }) {
  const { data } = await graphql(`
    {
      allSanityRedirect {
        nodes {
          from
          to
        }
      }
    }
  `)

  data.allSanityRedirect.nodes.forEach(node => {
    const { from, to } = node
    actions.createPage({
      path: from,
      component: path.resolve('./src/components/PageRedirect.js'),
      context: { from, to },
    })
  })
}

// need to pass today's date to events page
async function createCommunityEventsPage({ actions }) {
  const today = dayjs().format('YYYY-MM-DD')
  actions.createPage({
    path: '/community-events',
    component: path.resolve('./src/templates/CommunityEvents.js'),
    context: { today },
  })
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
    const { id, title, published_at, artwork_url } = podcast
    const slug = `${published_at.split('T')[0]}-${slugify(title)}` // ie 2021-10-04-shantel-clarke
    const [http, _, domain, v, imgId, jpg] = artwork_url.split('/')
    const nodeMeta = {
      id: String(id),
      slug,
      artwork_url: `${http}//${domain}/${imgId}`, // 403 workaround
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

async function createBlogNodes({ actions, createContentDigest }) {
  const API_VERSION = process.env.GATSBY_SHOPIFY_API_VERSION
  const SHOPIFY_GRAPHQL_URL = `${process.env.GATSBY_SHOPIFY_CHECKOUT_BASE}/api/${API_VERSION}/graphql.json`
  const SHOPIFY_STOREFRONT_ACCESS_TOKEN =
    process.env.GATSBY_SHOPIFY_STOREFRONT_KEY

  const getClient = () =>
    new GraphQLClient(SHOPIFY_GRAPHQL_URL, {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
    })

  const BLOG_QUERY = gql`
    query {
      blog(handle: "news") {
        articles(first: 250) {
          nodes {
            id
            handle
            title
            onlineStoreUrl
            excerpt
            contentHtml
            publishedAt
            image {
              altText
              url
              id
              height
              width
            }
            authorV2 {
              name
            }
            seo {
              title
              description
            }
          }
        }
      }
    }
  `

  const data = await getClient().request(BLOG_QUERY)
  const type = 'ShopifyArticle'
  if (data.blog === null) {
    const defaultValues = {
      id: 'SHOPIFY-BLOG-DEFAULT',
      handle: '',
      title: '',
      onlineStoreUrl: '',
      excerpt: '',
      contentHtml: '',
      image: null,
      authorV2: { name: '' },
      seo: { title: '', description: '' },
      publishedAt: new Date().toISOString(),
    }
    actions.createNode({
      ...defaultValues,
      internal: {
        type,
        contentDigest: createContentDigest(defaultValues),
      },
    })
    return
  }
  data.blog.articles.nodes.forEach(blog => {
    const nodeMeta = {
      internal: {
        type,
        contentDigest: createContentDigest(blog),
      },
    }
    actions.createNode({
      ...blog,
      ...nodeMeta,
    })
  })
}

export async function sourceNodes(params) {
  await Promise.all([
    createPodcastNodes(params),
    //
    createBlogNodes(params),
  ])
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
    createGiftGuidePages(params),
    createHomePage(params),
    createLocationPages(params),
    createRedirectPages(params),
    createCommunityEventsPage(params),
  ])
}
