import camelCaseRecursive from 'camelcase-keys-recursive'
import {
  createShopifyClient,
  getReviews,
  getProductQA,
  getShopifyProducts,
} from './fetch'

const formatMsg = msg => msg

const decodeShopifyId = base64Id => {
  const shopifyId = Buffer.from(base64Id, 'base64').toString('binary')
  const id = shopifyId.substr(shopifyId.lastIndexOf('/') + 1)
  return id
}

const createNodeFactory = async (
  type,
  createNode,
  createNodeId,
  createContentDigest,
  data
) => {
  await createNode({
    ...data,
    id: createNodeId(`${type}-${data.productId}`),
    parent: null,
    children: [],
    internal: {
      type,
      content: JSON.stringify(data),
      contentDigest: createContentDigest(data),
    },
  })
}

export async function sourceNodes(
  { actions: { createNode }, createNodeId, createContentDigest },
  { shopName, shopifyAccessToken, yotpoAppKey, shopifyApiVersion = '2021-01' }
) {
  const shopifyClient = createShopifyClient({
    shopName,
    shopifyAccessToken,
    apiVersion: shopifyApiVersion,
  })

  console.time(formatMsg('fetching shopify products'))
  const shopifyProductEdges = await getShopifyProducts({
    shopifyClient,
  })
  console.timeEnd(formatMsg('fetching shopify products'))

  const productIds = shopifyProductEdges.map(({ node }) =>
    decodeShopifyId(node.id)
  )

  console.time(formatMsg('fetching yotpo product reviews'))
  const reviews = await getReviews({
    productIds,
    yotpoAppKey,
    yotpoPerPage: 147,
  })
  console.timeEnd(formatMsg('fetching yotpo product reviews'))

  await Promise.all(
    reviews.map(async review => {
      const camelCaseReview = camelCaseRecursive(review)

      await createNodeFactory(
        'YotpoProductReview',
        createNode,
        createNodeId,
        createContentDigest,
        camelCaseReview
      )
    })
  )

  console.time(formatMsg('fetching yotpo product QA'))
  const productsQA = await getProductQA({
    productIds,
    yotpoAppKey,
  })
  console.timeEnd(formatMsg('fetching yotpo product QA'))

  await Promise.all(
    productsQA.map(async productQA => {
      const camelCaseQA = camelCaseRecursive(productQA)

      await createNodeFactory(
        'YotpoProductQA',
        createNode,
        createNodeId,
        createContentDigest,
        camelCaseQA
      )
    })
  )
}
