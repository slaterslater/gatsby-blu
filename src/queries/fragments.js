// import gql from 'graphql-tag'

// const ORDER_SUMMARY_FIELDS = gql`
//   fragment OrderSummaryFields on Order
// `
import gql from 'graphql-tag'

export const PRODUCT_PRICE_RANGE_FRAGMENT = gql`
  fragment ProductPriceRangeFields on Product {
    priceRangeV2: priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
  }
`
