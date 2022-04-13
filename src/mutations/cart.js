import gql from 'graphql-tag'
import { CHECKOUT_FRAGMENT } from '../queries/checkout'

const ERROR_FRAGMENT = gql`
  fragment ErrorFields on CheckoutUserError {
    code
    field
    message
  }
`

export const CreateCheckout = gql`
  ${CHECKOUT_FRAGMENT}
  mutation CreateCheckout(
    $lineItems: [CheckoutLineItemInput!]
    $presentmentCurrencyCode: CurrencyCode
  ) {
    checkoutCreate(
      input: {
        lineItems: $lineItems
        presentmentCurrencyCode: $presentmentCurrencyCode
      }
    ) {
      checkout {
        ...CheckoutFields
      }
    }
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

export const UpdateCheckoutAttributes = gql`
  ${CHECKOUT_FRAGMENT}
  ${ERROR_FRAGMENT}
  mutation ($checkoutId: ID!, $input: CheckoutAttributesUpdateInput!) {
    checkoutAttributesUpdate(checkoutId: $checkoutId, input: $input) {
      checkout {
        ...CheckoutFields
      }
      checkoutUserErrors {
        ...ErrorFields
      }
    }
  }
`
