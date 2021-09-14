import gql from 'graphql-tag'

export const PRODUCT_PRICE_RANGE_FRAGMENT = gql`
  fragment ProductPriceRangeFields on Product {
    priceRange {
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

export const PRODUCT_QUERY = gql`
  query ProductQuery($handle: String!) {
    productByHandle(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      productType
      vendor
      tags
      availableForSale
      options {
        name
        values
      }
      images(first: 25) {
        edges {
          node {
            altText
            originalSrc
            height
            width
            id
          }
        }
      }
      willRestock: metafield(namespace: "my_fields", key: "will_restock") {
        value
      }
      offersPairs: metafield(namespace: "my_fields", key: "offers_pairs") {
        value
      }
      variants(first: 100) {
        edges {
          node {
            id
            availableForSale
            currentlyNotInStock
            title
            sku
            selectedOptions {
              name
              value
            }
            quantityAvailable
            presentmentPrices(first: 100) {
              edges {
                node {
                  price {
                    amount
                    currencyCode
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
