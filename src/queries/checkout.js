import gql from 'graphql-tag'

export const CHECKOUT_FRAGMENT = gql`
  fragment CheckoutFields on Checkout {
    id
    webUrl
    completedAt
    lineItems(first: 250) {
      nodes {
        id
        quantity
        title
        customAttributes {
          key
          value
        }
        variant {
          id
          title
          priceV2 {
            amount
            currencyCode
          }
          product {
            id
          }
          availableForSale
          title
          image {
            altText
            url
            height
            width
            id
          }
          upgrade: metafield(namespace: "custom", key: "upgrade") {
            id: value
          }
        }
      }
    }
    note
    requiresShipping
    availableShippingRates {
      shippingRates {
        priceV2 {
          amount
          currencyCode
        }
      }
    }
    subtotalPriceV2 {
      amount
      currencyCode
    }
    totalPriceV2 {
      amount
      currencyCode
    }
  }
`

export const UPSELL_PRODUCT_FRAGMENT = gql`
  fragment UpsellProductFields on Product {
    id
    title
    images(first: 1) {
      nodes {
        altText
        url
        height
        width
        id
      }
    }
  }
`

export const CHECKOUT_QUERY = gql`
  ${CHECKOUT_FRAGMENT}
  ${UPSELL_PRODUCT_FRAGMENT}
  query CheckoutQuery($checkoutId: ID!, $countryCode: CountryCode)
  @inContext(country: $countryCode) {
    checkout: node(id: $checkoutId) {
      ... on Checkout {
        ...CheckoutFields
      }
    }
    addons: collection(handle: "you-might-also-like") {
      #addons: collection(handle: "gifts-under-300") {
      products(first: 50) {
        nodes {
          ...UpsellProductFields
          variants(first: 1) {
            nodes {
              id
              priceV2: price {
                amount
              }
            }
          }
        }
      }
    }
  }
`

export const UPGRADE_QUERY = gql`
  ${UPSELL_PRODUCT_FRAGMENT}
  query CheckoutQuery($id: ID!, $countryCode: CountryCode)
  @inContext(country: $countryCode) {
    upgrade: node(id: $id) {
      ... on ProductVariant {
        id
        availableForSale
        priceV2: price {
          amount
        }
        product {
          ...UpsellProductFields
        }
      }
    }
  }
`
