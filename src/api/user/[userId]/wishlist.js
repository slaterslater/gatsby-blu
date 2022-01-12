import { decode } from 'shopify-gid'
import { gql } from 'graphql-request'
import getClient from '../../../lib/adminApiClient'

const graphQLClient = getClient()

const CustomerWishlistQuery = gql`
  query CustomerWishlistQuery($id: ID!) {
    customer(id: $id) {
      wishlist: metafield(namespace: "my_fields", key: "wishlist") {
        id
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

const CustomerWishlistDelete = gql`
  mutation metafieldDelete($input: MetafieldDeleteInput!) {
    metafieldDelete(input: $input) {
      userErrors {
        field
        message
      }
    }
  }
`

export default async function (req, res) {
  const { userId } = req.params
  const { productHandle, method = 'POST' } = req.body

  if (!productHandle) {
    return res.status(422).json({ error: 'product handle is required' })
  }

  const { type, id } = decode(userId)
  const adminId = `gid://shopify/${type}/${id}`

  // delete wishlist (can't save empty string)
  const deleteWishlist = async wishlistId => {
    await graphQLClient.request(CustomerWishlistDelete, {
      input: {
        id: wishlistId,
      },
    })
  }

  // let data
  const data = await graphQLClient.request(CustomerWishlistQuery, {
    id: adminId,
  })

  const getUpdateUserInput = field => ({
    id: adminId,
    metafields: [field],
  })

  if (!data?.customer) {
    return res.status(400).json({ error: 'no user' })
  }

  const { wishlist } = data?.customer

  // customer update input
  let input

  if (!wishlist?.id) {
    // no wishlist so create a new one
    input = getUpdateUserInput({
      key: 'wishlist',
      namespace: 'my_fields',
      type: 'single_line_text_field',
      value: productHandle,
    })
  } else {
    if (method === 'DELETE') {
      const value = wishlist.value
        .split(' ')
        .filter(handle => handle !== productHandle)
        .join(' ')
      if (!value) {
        // can't save empty string to shopify metafield
        await deleteWishlist(wishlist.id)
        return res.status(201).json({ message: 'wishlist deleted' })
      }
      input = getUpdateUserInput({
        ...wishlist,
        value,
      })
    }
    if (method === 'POST') {
      const set = new Set(wishlist.value.split(' '))
      set.add(productHandle)
      const value = Array.from(set).join(' ')
      input = getUpdateUserInput({ ...wishlist, value })
    }
  }
  const cData = await graphQLClient.request(CustomerWishlistMutation, {
    input,
  })

  res.status(201).json(cData.customerUpdate)
}
