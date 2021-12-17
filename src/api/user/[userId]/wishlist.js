import { decode } from 'shopify-gid'
// move this function to /users/:id/wishlist

import { gql } from 'graphql-request'
import getClient from '../../../lib/adminApiClient'

const graphQLClient = getClient()

const CustomerWishlistQuery = gql`
  query CustomerWishlistQuery($id: ID!) {
    customer(id: $id) {
      wishlist: metafield(namespace: "my_fields", key: "wishlist") {
        value
      }
    }
  }
`

const CustomerWishlistMutation = gql`
  mutation customerUpdate($input: CustomerInput!) {
    customerUpdate(input: $input) {
      customer {
        wishlist: metafield(namespace: "my_fields", key: "wishlist") {
          value
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`

export default async function (req, res) {
  const { userId } = req.params
  const { productHandle } = req.body

  if (!productHandle) {
    return res.status(422).json({ error: 'product handle is required' })
  }

  const { type, id } = decode(userId)
  const adminId = `gid://shopify/${type}/${id}`

  console.log({ adminId })

  // let data
  const data = await graphQLClient.request(CustomerWishlistQuery, {
    id: adminId,
  })
  // } catch (e) {
  //   return res.status(400).json({ error: 'could not find user' })
  // }

  console.log({ data })
  const { value: wishlist } = data?.customer?.wishlist || {}
  console.log(wishlist)

  let value
  if (req.method === 'DELETE') {
    value = wishlist
      .split(' ')
      .filter(handle => handle !== productHandle)
      .join(' ')
  }

  if (req.method === 'POST') {
    if (!wishlist) {
      value = productHandle
    } else {
      value = `${wishlist} ${productHandle}`
    }
  }

  const input = {
    metafields: [
      {
        key: 'wishlist',
        namespace: 'my_fields',
        value,
      },
    ],
  }

  const metafieldData = await graphQLClient.request(CustomerWishlistMutation, {
    input,
  })

  console.log(metafieldData)

  res.status(201).json(metafieldData.privateMetafield)
}
