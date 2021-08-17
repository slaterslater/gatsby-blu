import gql from 'graphql-tag'

export const PAGE_QUERY = gql`
  query PageQuery($handle: String!) {
    pageByHandle(handle: $handle) {
      title
      bodySummary
      body
    }
  }
`
