import { gql } from 'graphql-request'

import getClient from '../lib/adminApiClient'

const graphQLClient = getClient()

const CustomerSearch = gql`
  query CustomerSearch($query: String!) {
    customers(first: 5, query: $query) {
      edges {
        node {
          id
          email
          acceptsMarketing
          tags
        }
      }
    }
  }
`

const CustomerUpdate = gql`
  mutation CustomerUpdate($input: CustomerInput!, $id: ID!) {
    customerUpdate(input: $input) {
      customer {
        id
        acceptsMarketing
      }
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

  // user already exists
  if (customersData.customers.edges.length) {
    // if exists and has marketing return 200
    const { acceptsMarketing, tags } = customersData.customers.edges[0].node
    if (acceptsMarketing && tags.includes('newsletter')) {
      return res.status(200).json({ message })
    }

    // if exists update marketing and return 201
    const { id } = customersData.customers.edges[0].node
    try {
      await graphQLClient.request(CustomerUpdate, {
        id,
        input: { acceptsMarketing: true, id },
      })
    } catch (e) {
      return { statusCode: 400, body: JSON.stringify({ message: e.message }) }
    }

    return res.status(201).json({ message })
  }

  // if !exists create customer with marketing and return 201
  try {
    await graphQLClient.request(CustomerCreate, {
      input: { email, acceptsMarketing: true, tags: 'newsletter' },
    })
  } catch (e) {
    return { statusCode: 400, message: e.message }
  }

  // if newsletter created
  return res.status(201).json({ message })
}
