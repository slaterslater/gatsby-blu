import { noop } from 'lodash'
import { useEffect, useCallback, useContext } from 'react'
import { CurrencyContext } from '../contexts/CurrencyContext'

const sendGtagEvent = (name, payload) => {
  if (window.gtag) {
    window.gtag('event', name, payload)
  }
}

const sendPinEvent = (name, payload = {}) => {
  if (window.pintrk) {
    window.pintrk('track', name, payload)
  }
}

const events = {
  viewProduct: (payload, currency) => {
    const product = payload
    sendGtagEvent('view_item', {
      currency,
      items: [
        {
          item_id: product.id,
          item_name: product.title,
          item_brand: product.vendor,
          item_category: product.productType,
          currency,
        },
      ],
    })
    sendPinEvent('pagevisit')
  },
  addToCart: payload => {
    const lineItem = payload
    // GA4
    sendGtagEvent('add_to_cart', {
      currency: lineItem.variant.priceV2.currencyCode,
      value: lineItem.variant.priceV2.amount,
      items: [
        {
          item_name: lineItem.title,
          item_id: lineItem.id,
          currency: lineItem.variant.priceV2.currencyCode,
          price: lineItem.variant.priceV2.amount,
          quantity: 1,
          item_variant: lineItem.variant.title,
        },
      ],
    })
    // pinterest.. apparently doesn't want a payload with this
    sendPinEvent('AddToCart')
  },
  viewCart: payload => {
    const checkout = payload

    sendGtagEvent('view_cart', {
      currency: checkout?.totalPriceV2.currencyCode,
      items: checkout?.lineItems.edges.map(({ node }) => ({
        item_id: node.id,
        item_name: node.title,
        item_variant: node.variant?.title,
        quantity: node.quantity,
        price: node.variant?.priceV2.amount * node.quantity,
        currency: node.variant?.priceV2.currencyCode,
      })),
      value: checkout?.totalPriceV2.amount,
    })
  },
  removeFromCart: payload => {
    const lineItem = payload
    sendGtagEvent('remove_from_cart', {
      currency: lineItem.variant.priceV2.currencyCode,
      items: [
        {
          item_id: lineItem.id,
          item_name: lineItem.title,
          price: lineItem.variant.priceV2.amount * lineItem.quantity,
          quantity: lineItem.quantity,
          currency: lineItem.variant.priceV2.currencyCode,
        },
      ],
      value: lineItem.variant.priceV2.amount,
    })
  },
  viewItemList: (products, title, handle) => {
    const formatProductItems = ps =>
      ps.slice(0, 10).map((product, i) => ({
        item_name: product.title,
        item_id: product.id,
        item_brand: product.vendor,
        price: product.priceRange?.minVariantPrice.amount,
        item_list_name: title,
        item_list_id: handle,
        index: i,
      }))

    const payload = {
      items: formatProductItems(products),
      item_list_name: title,
      item_list_id: handle,
    }

    sendGtagEvent('view_item_list', payload)
  },
}

export function useAnalytics(event = '', payload = {}) {
  const { currencyCode } = useContext(CurrencyContext)

  useEffect(() => {
    const sendAnalytics = events[event] || noop()
    sendAnalytics(payload, currencyCode)
  }, [])
}

export function useSendAnalytics(event = '') {
  return useCallback(
    payload => {
      const sendAnalytics = events[event] || noop()
      sendAnalytics(payload)
    },
    [event]
  )
}
