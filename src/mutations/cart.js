import gql from 'graphql-tag'
import { CHECKOUT_FRAGMENT } from '../queries/checkout'

export const UPDATE_LINE_ITEM = gql`
  ${CHECKOUT_FRAGMENT}
  mutation UpdateLineItem(
    $checkoutId: ID!
    $lineItems: [CheckoutLineItemUpdateInput!]!
  ) {
    checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkout {
        ...CheckoutFields
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`

export const AddCheckoutLineItem = gql`
  ${CHECKOUT_FRAGMENT}
  mutation AddCheckoutLineItem(
    $checkoutId: String!
    $lineItems: [CheckoutLineItemInput!]!
  ) {
    mutation
    checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkout {
        ...CheckoutFields
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`
