import { GraphQLClient } from 'graphql-request'
import axios from 'axios'

export const createShopifyClient = ({
  shopName,
  shopifyAccessToken,
  apiVersion,
}) => {
  let url
  if (shopName.includes(`.`)) {
    url = `https://${shopName}/api/${apiVersion}/graphql.json`
  } else {
    url = `https://${shopName}.myshopify.com/api/${apiVersion}/graphql.json`
  }
  return new GraphQLClient(url, {
    headers: {
      'X-Shopify-Storefront-Access-Token': shopifyAccessToken,
    },
  })
}
const makeYotpoRequest = (yotpoAppKey, yotpoPerPage, id) =>
  axios.get(
    `https://api.yotpo.com/v1/widget/${yotpoAppKey}/products/${id}/reviews.json`,
    {
      params: {
        per_page: yotpoPerPage,
        page: 1,
      },
    }
  )

export const getProductQA = async ({ productIds, yotpoAppKey }) => {
  const promises = productIds.map(async id => {
    let res
    try {
      res = await axios.get(
        `https://api.yotpo.com/products/${yotpoAppKey}/${id}/questions`
      )
    } catch (e) {
      console.log('error getting productQA')
    }
    if (res && res.data) {
      return { ...res.data.response, productId: id }
    }
    return null
  })
  const responses = await Promise.all(promises)
  return responses.filter(res => !!res)
}

export const getReviews = async ({ productIds, yotpoAppKey, yotpoPerPage }) => {
  const promises = productIds.map(async id => {
    let res
    try {
      res = await makeYotpoRequest(yotpoAppKey, yotpoPerPage, id)
    } catch (e) {
      console.log('error getting review')
    }
    if (res && res.data) {
      return { ...res.data.response, productId: id }
    }
    return null
  })
  const responses = await Promise.all(promises)
  return responses.filter(res => !!res)
}

const ALL_PRODUCTS = `
  query AllProducts($after: String) {
    products(first: 100, after: $after) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          id
        }
        cursor
      }
    }
  }
`

export const getShopifyProducts = async ({ shopifyClient }) => {
  const getAggregatedProducts = async ({ after } = {}) => {
    const response = await shopifyClient.request(ALL_PRODUCTS, { after })
    const data = response.products.edges

    if (response.products.pageInfo.hasNextPage) {
      const [lastEdge] = response.products.edges.slice(-1)
      return data.concat(
        await getAggregatedProducts({ after: lastEdge.cursor })
      )
    }
    return data
  }

  return getAggregatedProducts()
}
