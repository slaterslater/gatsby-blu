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

export const PRODUCT_ITEM_QUERY_FRAGMENT = gql`
  fragment ProductItemQueryFields on Product {
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
    byAppointmentOnly: metafield(namespace: "custom", key: "appt_only") {
      value
    }
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
`

export const PRODUCT_ITEM_QUERY = gql`
  ${PRODUCT_ITEM_QUERY_FRAGMENT}
  query ProductItemQuery($handle: String, $countryCode: CountryCode)
  @inContext(country: $countryCode) {
    product(handle: $handle) {
      ...ProductItemQueryFields
    }
  }
`

export const PRODUCT_ITEM_QUERY_BY_ID = gql`
  ${PRODUCT_ITEM_QUERY_FRAGMENT}
  query ProductItemQuery($id: ID, $countryCode: CountryCode)
  @inContext(country: $countryCode) {
    product(id: $id) {
      ...ProductItemQueryFields
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
      offersFractions: metafield(
        namespace: "my_fields"
        key: "fractional_sizes"
      ) {
        value
      }
      productColor: metafield(namespace: "my_fields", key: "product_color") {
        value
      }
      colorAlternates: metafield(namespace: "my_fields", key: "color_options") {
        value
      }
      madeToOrder: metafield(namespace: "my_fields", key: "made_to_order") {
        value
      }
      byAppointmentOnly: metafield(namespace: "custom", key: "appt_only") {
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
            madeToOrder: metafield(
              namespace: "my_fields"
              key: "made_to_order"
            ) {
              value
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
        productColor: metafield(namespace: "my_fields", key: "product_color") {
          value
        }
      }
    }
  }
`

// export const STACK_WITH_QUERY = gql`
//   query ($ids: [ID!]!, $countryCode: CountryCode)
//   @inContext(country: $countryCode) {
//     nodes(ids: $ids) {
//       ... on Product {
//         variants(first: 50) {
//           nodes {
//             priceV2 {
//               amount
//               currencyCode
//             }
//           }
//         }
//       }
//     }
//   }
// `
