import { noop } from 'lodash'
import { useEffect, useCallback, useContext } from 'react'
import { CurrencyContext } from '../contexts/CurrencyContext'

const getAdminId = (id = '') => {
  const [storefrontId] = id.split('__').slice(-1)
  // const gid = atob(storefrontId)
  const gid = storefrontId
  const [adminId] = gid.split('/').slice(-1)
  return adminId
}

const getShopifyProductId = (product, variant) => {
  const productId = getAdminId(product?.id)

  switch (true) {
    case variant:
      return `shopify_CA_${productId}_${variant}`
    case !!product.variants.find(v => v.availableForSale): {
      const availableVariant = product.variants.find(v => v.availableForSale)
      const variantId = getAdminId(availableVariant.id)
      return `shopify_CA_${productId}_${variantId}`
    }
    default: {
      const [firstVariant] = product.variants
      const variantId = getAdminId(firstVariant.id)

      return `shopify_CA_${productId}_${variantId}`
    }
  }
}

const sendKlaviyoEvent = (name, payload) => {
  if (!window._learnq) {
    window._learnq = []
  }
  window._learnq.push(['track', name, payload])
}

const sendGtagEvent = (name, payload) => {
  if (window.gtag) {
    window.gtag('event', name, payload)
  }
}

const sendAWEvent = (name, payload) =>
  sendGtagEvent(name, {
    send_to: process.env.GATSBY_AW_CONVERSION_ID,
    ...payload,
  })

const sendPinEvent = (name, payload = {}) => {
  if (window.pintrk) {
    window.pintrk('track', name, payload)
  }
}

const events = {
  viewHome: () => {
    sendAWEvent('page_view', { ecomm_pagetype: 'home' })
  },
  viewProduct: (payload, currency) => {
    const { product, variant } = payload
    const itemId = getShopifyProductId(product, variant)
    sendGtagEvent('view_item', {
      currency,
      items: [
        {
          item_id: itemId,
          item_name: product.title,
          item_brand: product.vendor,
          item_category: product.productType,
          currency,
        },
      ],
    })
    sendAWEvent('page_view', {
      ecomm_prodid: itemId,
    })
    sendPinEvent('pagevisit')
    sendKlaviyoEvent('Viewed Product', {
      ProductName: product.title,
      ProductID: itemId,
      Categories: [product.productType],
    })
    sendKlaviyoEvent('trackViewedItem', {
      Title: product.title,
      ItemId: itemId,
      Categories: [product.productType],
    })
  },
  addToCart: payload => {
    const lineItem = payload
    // GA4
    sendGtagEvent('add_to_cart', {
      currency: lineItem.variant?.priceV2.currencyCode,
      value: lineItem.variant?.priceV2.amount,
      items: [
        {
          item_name: lineItem.title,
          item_id: lineItem.id,
          currency: lineItem.variant?.priceV2.currencyCode,
          price: lineItem.variant?.priceV2.amount,
          quantity: 1,
          item_variant: lineItem.variant?.title,
        },
      ],
    })
    // pinterest.. apparently doesn't want a payload with this
    sendPinEvent('AddToCart')
    sendKlaviyoEvent('Added to Cart', {
      AddedItemProductName: lineItem.title,
      AddedItemProductID: lineItem.id,
      AddedItemCategories: [lineItem.productType],
      AddedItemPrice: lineItem.variant?.priceV2.amount,
      AddedItemQuantity: 1,
    })
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
    sendAWEvent('page_view', {
      ecomm_pagetype: 'cart',
      ecomm_prodid: checkout?.lineItems.edges.map(
        ({ node }) => node.variant.product.id
      ),
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
    sendAWEvent('page_view', { ecomm_pagetype: 'category' })
  },
  viewSearch: () => {
    sendAWEvent('page_view', { ecomm_pagetype: 'searchresults' })
  },
  viewPage: () => {
    sendAWEvent('page_view', { ecomm_pagetype: 'other' })
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
