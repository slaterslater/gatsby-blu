import gql from 'graphql-tag'
import { CHECKOUT_FRAGMENT } from '../queries/checkout'

const ERROR_FRAGMENT = gql`
  fragment ErrorFields on CheckoutUserError {
    code
    field
    message
  }
`

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
