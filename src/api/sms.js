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

  const message = `${phone} accepts marketing`
  const [customer] = customersData.customers.nodes
  const smsMarketingConsent = {
    marketingState: 'SUBSCRIBED',
    marketingOptInLevel: 'SINGLE_OPT_IN',
    consentUpdatedAt: new Date().toISOString(),
  }

  // // user already exists
  if (customer) {
    //   // if exists and has marketing return 200
    const {
      id,
      smsMarketingConsent: { marketingState },
    } = customer

    if (marketingState === 'SUBSCRIBED') {
      return res.status(200).json({ message })
    }
    //   // if exists update marketing and return 201
    try {
      await graphQLClient.request(CustomerUpdate, {
        input: {
          customerId: id,
          smsMarketingConsent,
        },
      })
    } catch (e) {
      return { statusCode: 400, body: JSON.stringify({ message: e.message }) }
    }

    return res.status(201).json({ message })
  }

  try {
    // add profile to klaviyo list
    const API_KEY = process.env.GATSBY_KLAVIYO_API_KEY
    const LIST_ID = 'RSCLYt'
    const url = `https://a.klaviyo.com/api/v2/list/${LIST_ID}/subscribe?api_key=${API_KEY}`
    const profiles = [{ phone_number: phone, sms_consent: true }]
    await axios.post(url, { profiles })
    return res.status(201).json({ message: 'profile added to klaviyo' })
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ message: e.message }) }
  }
}
