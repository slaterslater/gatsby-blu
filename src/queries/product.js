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

export const PRODUCT_ITEM_QUERY_FRAGMENT = gql`
  fragment ProductItemQueryFields on Product {
    handle
    title
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

export const PRODUCT_METAFIELDS_FRAGMENT = gql`
  fragment ProductMetafields on Product {
    metafields(
      identifiers: [
        { namespace: "custom", key: "sell_after" }
        { namespace: "custom", key: "filters" }
        { namespace: "custom", key: "label" }
        { namespace: "custom", key: "appt_only" }
        { namespace: "my_fields", key: "made_to_order" }
        { namespace: "my_fields", key: "card" }
        { namespace: "my_fields", key: "product_color" }
        { namespace: "my_fields", key: "color_options" }
        { namespace: "my_fields", key: "stack_with" }
        { namespace: "my_fields", key: "pre_order" }
        { namespace: "my_fields", key: "fractional_sizes" }
        { namespace: "my_fields", key: "metal_option_white_gold" }
        { namespace: "my_fields", key: "metal_option_yellow_gold" }
        { namespace: "my_fields", key: "metal_option_sterling_silver" }
        { namespace: "my_fields", key: "metal_option_rose_gold" }
        { namespace: "my_fields", key: "related_product_collection" }
        { namespace: "my_fields", key: "gift_wrapping_style" }
        { namespace: "my_fields", key: "engravable_characters" }
        { namespace: "my_fields", key: "engagement_consultation_button" }
        { namespace: "my_fields", key: "product_specifications" }
        { namespace: "my_fields", key: "offers_pairs" }
        { namespace: "my_fields", key: "will_restock" }
      ]
    ) {
      key
      value
      updatedAt
    }
  }
`

export const PRODUCT_QUERY = gql`
  ${PRODUCT_METAFIELDS_FRAGMENT}
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
      ...ProductMetafields
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
            compareAtPrice {
              amount
              currencyCode
            }
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
