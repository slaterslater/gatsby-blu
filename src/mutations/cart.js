import gql from 'graphql-tag'
import { CART_FRAGMENT, CHECKOUT_FRAGMENT } from '../queries/checkout'

const ERROR_FRAGMENT = gql`
  fragment ErrorFields on CartUserError {
    code
    field
    message
  }
`

// DEPRECIATED
export const CreateCheckout = gql`
  ${CHECKOUT_FRAGMENT}
  mutation (
    $countryCode: CountryCode!
    $buyerIdentity: CheckoutBuyerIdentityInput!
    $lineItems: [CheckoutLineItemInput!]
  ) @inContext(country: $countryCode) {
    checkoutCreate(
      input: { lineItems: $lineItems, buyerIdentity: $buyerIdentity }
    ) {
      checkout {
        ...CheckoutFields
      }
    }
  }
`

export const CartCreate = gql`
  ${CART_FRAGMENT}
mutation (
  $countryCode: CountryCode!
  $buyerIdentity: CartBuyerIdentityInput!
  $lines: [CartLineInput!]
) @inContext(country: $countryCode) {
  cartCreate(
      input: { lines: $lines, buyerIdentity: $buyerIdentity }
    ) {
    cart {
      ...CartFields
    }
  }
}
`
// DEPRECIATED
export const UpdateCheckoutLineItem = gql`
  ${CHECKOUT_FRAGMENT}
  ${ERROR_FRAGMENT}
  mutation UpdateLineItem(
    $checkoutId: ID!
    $lineItems: [CheckoutLineItemUpdateInput!]!
  ) {
    checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkout {
        ...CheckoutFields
      }
      checkoutUserErrors {
        ...ErrorFields
      }
    }
  }
`
export const UpdateCartLine = gql`
  ${CART_FRAGMENT}
  ${ERROR_FRAGMENT}
  mutation UpdateCartLine(
    $cartId: ID!
    $lines: [CartLineUpdateInput!]!
  ) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        ...ErrorFields
      }
    }
  }
`
// DEPRECIATED
export const AddCheckoutLineItem = gql`
  ${CHECKOUT_FRAGMENT}
  ${ERROR_FRAGMENT}
  mutation AddCheckoutLineItem(
    $checkoutId: ID!
    $lineItems: [CheckoutLineItemInput!]!
  ) {
    checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkout {
        ...CheckoutFields
      }
      checkoutUserErrors {
        ...ErrorFields
      }
    }
  }
`

export const AddCartLines = gql`
  ${CART_FRAGMENT}
  ${ERROR_FRAGMENT}
  mutation AddCartLines(
    $cartId: ID!
    $lines: [CartLineInput!]!
  ) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        ...ErrorFields
      }
    }
  }
`
// DEPRECIATED
export const RemoveCheckoutLineItem = gql`
  ${CHECKOUT_FRAGMENT}
  ${ERROR_FRAGMENT}
  mutation RemoveCheckoutLineItem($checkoutId: ID!, $lineItemIds: [ID!]!) {
    checkoutLineItemsRemove(
      checkoutId: $checkoutId
      lineItemIds: $lineItemIds
    ) {
      checkout {
        ...CheckoutFields
      }
      checkoutUserErrors {
        ...ErrorFields
      }
    }
  }
`
export const RemoveCartLine = gql`
  ${CART_FRAGMENT}
  ${ERROR_FRAGMENT}
  mutation RemoveCartLine($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(
      cartId: $cartId
      lineIds: $lineIds
    ) {
      cart {
        ...CartFields
      }
      userErrors {
        ...ErrorFields
      }
    }
  }
`

// DEPRECIATED
export const AssociateCustomerWithCheckout = gql`
  ${CHECKOUT_FRAGMENT}
  ${ERROR_FRAGMENT}
  mutation checkoutCustomerAssociateV2(
    $checkoutId: ID!
    $customerAccessToken: String!
  ) {
    checkoutCustomerAssociateV2(
      checkoutId: $checkoutId
      customerAccessToken: $customerAccessToken
    ) {
      checkout {
        ...CheckoutFields
      }
      checkoutUserErrors {
        ...ErrorFields
      }
      customer {
        id
      }
    }
  }
`

export const CartBuyerIdentityUpdate = gql`
  ${CART_FRAGMENT}
  ${ERROR_FRAGMENT}
  mutation cartBuyerIdentityUpdate($buyerIdentity: CartBuyerIdentityInput!, $cartId: ID!) {
    cartBuyerIdentityUpdate(buyerIdentity: $buyerIdentity, cartId: $cartId) {
      cart {
        ...CartFields
      }
      userErrors {
        ...ErrorFields
      }
    }
  }
`

// DEPRECIATED
export const UpdateCheckoutAttributes = gql`
  ${CHECKOUT_FRAGMENT}
  ${ERROR_FRAGMENT}
  mutation ($checkoutId: ID!, $input: CheckoutAttributesUpdateV2Input!) {
    checkoutAttributesUpdateV2(checkoutId: $checkoutId, input: $input) {
      checkout {
        ...CheckoutFields
      }
      checkoutUserErrors {
        ...ErrorFields
      }
    }
  }
`

export const UpdateCartNote = gql`
  ${CART_FRAGMENT}
  ${ERROR_FRAGMENT}
  mutation UpdateCartNote($cartId: ID!, $note: String!) {
    cartNoteUpdate(cartId: $cartId, note: $note) {
      cart {
        ...CartFields
      }
      userErrors {
        ...ErrorFields
      }
    }
  }
`
