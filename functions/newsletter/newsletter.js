const GraphqlRequest = require('graphql-request')

const { GraphQLClient, gql } = GraphqlRequest

const shop = 'blubohoo'
const url = `https://${shop}.myshopify.com/admin/api/2021-01/graphql.json`

const graphQLClient = new GraphQLClient(url, {
  headers: {
    'X-Shopify-Access-Token': `${process.env.SHOPIFY_ADMIN_API_NEWSLETTER_PASSWORD}`,
    'Content-Type': 'application/json',
  },
})

const CustomerSearch = gql`
  query CustomerSearch($query: String!) {
    customers(first: 5, query: $query) {
      edges {
        node {
          id
          email
          acceptsMarketing
        }
      }
    }
  }
`

const CustomerUpdate = gql`
  mutation customerUpdate($input: CustomerInput!) {
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
exports.handler = async (event, context) => {
  const body = JSON.parse(event.body)

  const requiredFields = ['email']

  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: `You are missing the ${field} field` }),
      }
    }
  }

  const { email } = body

  const customersData = await graphQLClient.request(CustomerSearch, {
    query: `email:${email}`,
  })

  if (customersData.customers.edges.length) {
    // user already exists

    // if exists and has marketing return 200
    const { acceptsMarketing } = customersData.customers.edges[0].node
    if (acceptsMarketing) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: `${email} accepts marketing` }),
      }
    }

    // if exists update marketing and return 201
    const { id } = customersData.customers.edges[0].node
    try {
      await graphQLClient.request(CustomerUpdate, {
        input: { acceptsMarketing: true, id },
      })
    } catch (e) {
      return { statusCode: 400, body: JSON.stringify({ message: e.message }) }
    }

    return {
      statusCode: 201,
      body: JSON.stringify({ message: `${email} accepts marketing` }),
    }
  }
  // if !exists create customer with marketing and return 201

  try {
    await graphQLClient.request(CustomerCreate, {
      input: { email, acceptsMarketing: true },
    })
  } catch (e) {
    return { statusCode: 400, message: e.message }
  }

  // if newsletter created
  return {
    statusCode: 201,
    body: JSON.stringify({ message: `${email} accepts marketing` }),
  }
}
