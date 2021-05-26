import { useContext, useEffect } from 'react'
import { useProductPrice } from '../components/CollectionProduct'
import { CurrencyContext } from '../contexts/CurrencyContext'

const useGtagEvent = (eventName, payload) => {
  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', eventName, payload)
    }
  }, [])
}

export function useGtagViewItemList(products, itemListName, itemListId) {
  const formatProductItems = (products, itemListName, itemListId) =>
    products.slice(0, 10).map((product, i) => ({
      item_name: product.title,
      item_id: product.id,
      item_brand: product.vendor,
      price: product.priceRange?.minVariantPrice.amount,
      item_list_name: itemListName,
      item_list_id: itemListId,
      index: i,
    }))

  const payload = {
    items: formatProductItems(products),
    item_list_name: itemListName,
    item_list_id: itemListId,
  }

  useGtagEvent('view_item_list', payload)
}

export function useGtagViewItem(product) {
  const { currencyCode } = useContext(CurrencyContext)
  // const [price] = useProductPrice(product)
  //
  useGtagEvent('view_item', {
    currency: currencyCode,
    items: [
      {
        item_id: product.id,
        item_name: product.title,
        item_brand: product.vendor,
        item_category: product.productType,
        currency: currencyCode,
      },
    ],
  })
}

export function useGtagViewCart(checkout) {
  const payload = {
    currency: checkout?.totalPriceV2.currencyCode,
    items: checkout?.lineItems.edges.map(({ node }) => ({
      item_id: node.id,
      item_name: node.title,
      quantity: node.quantity,
      price: node.variant.priceV2.amount * node.quantity,
      currency: node.variant.priceV2.currencyCode,
    })),
    value: checkout?.totalPriceV2.amount,
  }

  useGtagEvent('view_cart', payload)
}
