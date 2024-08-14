// src/api/available-in-store.js

import { gql } from 'graphql-request'
import getClient from '../lib/adminApiClient'

const graphQLClient = getClient()

const ProductAvailableInStore = gql`
  query ($handle: String!) {
    productByHandle(handle: "bubble-ring-10k-gold") {
      totalInventory
      variants(first: 10) {
        edges {
          node {
            inventoryItem {
              locationsCount {
                count
              }
              inventoryLevels(first: 20) {
                edges {
                  node {
                    quantities(names: "available") {
                      quantity
                    }
                    location {
                      id
                      name
                      address {
                        zip
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export default async function (req, res) {
  const { handle } = req.body

  if (!handle) {
    return res.status(422).json({ error: 'product handle is required' })
  }

  const data = await graphQLClient.request(ProductAvailableInStore, {
    handle,
  })

  if (!data?.productByHandle) {
    return res.status(400).json({ error: 'no product availability data' })
  }

  res.status(201).json(data.productByHandle)
}
