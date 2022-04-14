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

export const PRODUCT_ITEM_QUERY = gql`
  query ProductItemQuery($handle: String, $countryCode: CountryCode)
  @inContext(country: $countryCode) {
    product(handle: $handle) {
      handle
      title
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
      tags
      availableForSale
      images(first: 2) {
        edges {
          node {
            altText
            url
            height
            width
            id
          }
        }
      }
    }
  }
`

export const PRODUCT_QUERY = gql`
  query ProductQuery($handle: String!, $countryCode: CountryCode)
  @inContext(country: $countryCode) {
    product(handle: $handle) {
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
      media(first: 25) {
        edges {
          node {
            ... on Video {
              id
              sources {
                format
                url
              }
            }
            ... on MediaImage {
              image {
                altText
                url
                height
                width
                id
              }
            }
          }
        }
      }
      images(first: 25) {
        edges {
          node {
            altText
            url
            height
            width
            id
          }
        }
      }
      metafields(first: 250) {
        edges {
          node {
            value
            key
          }
        }
      }
      willRestock: metafield(namespace: "my_fields", key: "will_restock") {
        value
      }
      engagementConsultationButton: metafield(
        namespace: "my_fields"
        key: "engagement_consultation_button"
      ) {
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
            priceV2 {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`

export const ALTERNATES_QUERY = gql`
  query ($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Product {
        id
        title
        handle
        options {
          name
          values
        }
      }
    }
  }
`
