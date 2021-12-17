import gql from 'graphql-tag'

export const USER_QUERY = gql`
  query UserQuery($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      acceptsMarketing
      displayName
      firstName
      lastName
      email
      id
      wishlist: metafield(namespace: "my_fields", key: "wishlist") {
        value
      }
    }
  }
`
