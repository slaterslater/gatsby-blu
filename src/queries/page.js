import gql from 'graphql-tag'

export const PAGE_QUERY = gql`
  query PageQuery($handle: String!) {
    page(handle: $handle) {
      title
      bodySummary
      body
    }
  }
`
