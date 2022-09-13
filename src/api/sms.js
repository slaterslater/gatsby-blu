// src/api/sms.js

import { gql } from 'graphql-request'
import axios from 'axios'

import getClient from '../lib/adminApiClient'

const graphQLClient = getClient()

const CustomerSearch = gql`
  query CustomerSearch($query: String!) {
    customers(first: 5, query: $query) {
      nodes {
        id
        phone
        smsMarketingConsent {
          marketingState
          consentUpdatedAt
          consentCollectedFrom
        }
      }
    }
  }
`

const CustomerUpdate = gql`
  mutation ($input: CustomerSmsMarketingConsentUpdateInput!) {
    customerSmsMarketingConsentUpdate(input: $input) {
      userErrors {
        field
        message
      }
    }
  }
`

export default async function (req, res) {
  const { callingCode, phoneNumber } = req.body

  if (!phoneNumber) {
    return res.status(400).json({ error: `You are missing the phone number` })
  }

  const phone = `+${callingCode}${phoneNumber}`

  const customersData = await graphQLClient.request(CustomerSearch, {
    query: `phone:${phone}`,
  })

  const [customer] = customersData.customers.nodes

  if (customer) {
    const {
      id,
      smsMarketingConsent: { marketingState },
    } = customer
    const smsMarketingConsent = {
      marketingState: 'SUBSCRIBED',
      marketingOptInLevel: 'SINGLE_OPT_IN',
      consentUpdatedAt: new Date().toISOString(),
    }
    // const message = `${phone} accepts marketing`

    // if (marketingState === 'SUBSCRIBED') {
    // return res.status(200).json({ message })
    // }
    if (marketingState !== 'SUBSCRIBED') {
      try {
        await graphQLClient.request(CustomerUpdate, {
          input: {
            customerId: id,
            smsMarketingConsent,
          },
        })
      } catch (e) {
        return res.status(400).json({
          message: `error updating ${phone} in Shopify \n ${e.message}`,
        })
      }
    }
    // return res.status(201).json({ message })
  }

  try {
    // add subscriber to yotpo list
    const storeId = process.env.YOTPO_APP_KEY
    const secret = process.env.YOTPO_APP_SECRET

    const subscriber = {
      phone,
      list_id: 4096107,
      source: 'bluboho.com',
    }
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }

    // uToken expires every 14 days...
    // https://core-api.yotpo.com/reference/yotpo-authentication

    const tokenRequest = await axios.post(
      `https://api.yotpo.com/core/v3/stores/${storeId}/access_tokens`,
      { secret },
      { headers }
    )

    await axios.post(
      `https://api.yotpo.com/messaging/v3/stores/${storeId}/subscribers`,
      { subscriber },
      {
        headers: {
          'X-Yotpo-Token': tokenRequest.data.access_token,
          ...headers,
        },
      }
    )

    return res.status(201).json({ message: `${phone} added to yotpo` })
  } catch (e) {
    return res.status(400).json({
      message: `error updating ${phone} in yotpo \n ${e.message}`,
    })
  }
}
