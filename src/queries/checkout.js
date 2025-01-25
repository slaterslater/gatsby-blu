import gql from 'graphql-tag'

// DEPRECIATED
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
        discountAllocations {
          allocatedAmount {
            amount
            currencyCode
          }
          discountApplication {
            ... on AutomaticDiscountApplication {
              title
            }
          }
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

export const CART_FRAGMENT = gql`
fragment CartFields on Cart {
			id
      note
      checkoutUrl
      cost {
        subtotalAmount {
          amount
          currencyCode
        }
        totalAmount {
          amount
          currencyCode
        }
      }
      lines(first: 250) {
        nodes {
          id
          quantity
          attributes {
            key
            value
          }
          discountAllocations {
            discountedAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
            id
            title
            price {
              amount
              currencyCode
            }
            product {
              id
              title
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
    } 
  }
`

export const UPSELL_PRODUCT_FRAGMENT = gql`
  fragment UpsellProductFields on Product {
    id
    title
    handle
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
// DEPRECIATED
export const CHECKOUT_QUERY = gql`
  ${CHECKOUT_FRAGMENT}
  ${UPSELL_PRODUCT_FRAGMENT}
  query CheckoutQuery($cartId: ID!, $countryCode: CountryCode)
  @inContext(country: $countryCode) {
    checkout: node(id: $cartId) {
      ... on Checkout {
        ...CheckoutFields
      }
    }
    addons: collection(handle: "you-might-also-like") {
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

export const CART_QUERY = gql`
  ${CART_FRAGMENT}
  ${UPSELL_PRODUCT_FRAGMENT}
  query CartQuery($cartId: ID!, $countryCode: CountryCode)
  @inContext(country: $countryCode) {
    cart: node(id: $cartId) {
      ... on Cart {
        ...CartFields
      }
    }
    addons: collection(handle: "you-might-also-like") {
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
