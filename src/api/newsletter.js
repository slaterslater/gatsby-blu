import { gql } from 'graphql-request'

import getClient from '../lib/adminApiClient'

const graphQLClient = getClient()

const CustomerSearch = gql`
  query CustomerSearch($query: String!) {
    customers(first: 5, query: $query) {
      nodes {
        id
        email
        tags
        emailMarketingConsent {
          marketingState
          consentUpdatedAt
        }
      }
    }
  }
`

const CustomerUpdate = gql`
  mutation ($input: CustomerEmailMarketingConsentUpdateInput!, $id: ID!) {
    customerEmailMarketingConsentUpdate(input: $input) {
      userErrors {
        field
        message
      }
    }
    tagsAdd(id: $id, tags: "newsletter") {
      userErrors {
        field
        message
      }
    }
  }
`

const CustomerCreate = gql`
  mutation customerCreate($input: CustomerInput!) {
    customerCreate(input: $input) {
      customer {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`

export default async function (req, res) {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ error: `You are missing the email` })
  }

  const customersData = await graphQLClient.request(CustomerSearch, {
    query: `email:${email}`,
  })

  const message = `${email} accepts marketing`
  const [customer] = customersData.customers.nodes
  const emailMarketingConsent = {
    marketingState: 'SUBSCRIBED',
    marketingOptInLevel: 'SINGLE_OPT_IN',
    consentUpdatedAt: new Date().toISOString(),
  }

  // user already exists
  if (customer) {
    // if exists and has marketing return 200
    const {
      id,
      emailMarketingConsent: { marketingState },
      tags,
    } = customer
    if (marketingState === 'SUBSCRIBED' && tags.includes('newsletter')) {
      return res.status(200).json({ message })
    }

    // if exists update marketing and return 201
    try {
      await graphQLClient.request(CustomerUpdate, {
        id,
        input: {
          customerId: id,
          emailMarketingConsent,
        },
      })
    } catch (e) {
      return { statusCode: 400, body: JSON.stringify({ message: e.message }) }
    }

    return res.status(201).json({ message })
  }

  // if !exists create customer with marketing and return 201
  try {
    await graphQLClient.request(CustomerCreate, {
      input: {
        email,
        tags: 'newsletter',
        emailMarketingConsent,
      },
    })
  } catch (e) {
    return { statusCode: 400, message: e.message }
  }

  // if newsletter created
  return res.status(201).json({ message })
}
