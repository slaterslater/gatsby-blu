import gql from 'graphql-tag'

export const HOMEPAGE_REVIEW_PRODUCT = gql`
  query HomepageReviewProduct($handle: String!) {
    productByHandle(handle: $handle) {
      images(first: 1) {
        edges {
          node {
            originalSrc
            altText
            height
            width
            id
          }
        }
      }
    }
  }
`
