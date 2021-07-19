import { useCallback, useContext, useEffect } from 'react'
import { useProductPrice } from '../components/CollectionProduct'
import { CurrencyContext } from '../contexts/CurrencyContext'

const useGtagEffect = (eventName, payload) => {
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

  useGtagEffect('view_item_list', payload)
}

export function useGtagViewItem(product) {
  const { currencyCode } = useContext(CurrencyContext)
  // const [price] = useProductPrice(product)
  //
  useGtagEffect('view_item', {
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
      item_variant: node.variant?.title,
      quantity: node.quantity,
      price: node.variant?.priceV2.amount * node.quantity,
      currency: node.variant?.priceV2.currencyCode,
    })),
    value: checkout?.totalPriceV2.amount,
  }

  useGtagEffect('view_cart', payload)
}

export function useGtagRemoveFromCart(item) {
  return useCallback(() => {
    if (!item.variant) return false
    const payload = {
      currency: item.variant.priceV2.currencyCode,
      items: [
        {
          item_id: item.id,
          item_name: item.title,
          price: item.variant.priceV2.amount * item.quantity,
          quantity: item.quantity,
          currency: item.variant.priceV2.currencyCode,
        },
      ],
      value: item.variant.priceV2.amount,
    }
    if (window.gtag) {
      window.gtag('event', 'remove_from_cart', payload)
    }
  }, [item])
}

export function useGtagAddToCart() {
  return item => {
    const payload = {
      currency: item.variant.priceV2.currencyCode,
      value: item.variant.priceV2.amount,
      items: [
        {
          item_name: item.title,
          item_id: item.id,
          currency: item.variant.priceV2.currencyCode,
          price: item.variant.priceV2.amount,
          quantity: 1,
          item_variant: item.variant.title,
        },
      ],
    }

    if (window.gtag) {
      window.gtag('event', 'add_to_cart', payload)
    }
  }
}

// export function useGtagSelectItem() {
//   return (item, index, listName, listId) => {
//     const payload = {
//       item_list_name: listName,
//       item_list_id: listId,
//       items: [
//         {
//           ...item,
//           item_name: item.title,
//           item_id: item.handle,
//           index,
//       price: product.priceRange?.minVariantPrice.amount,
//           currency: item.variant.priceV2.currencyCode,
//           price: item.variant.priceV2.amount,
//           quantity: 1,
//           item_variant: item.variant.title,
//       item_list_name: listName,
//       item_list_id: listId,
//         },
//       ],
//     }

//     if (window.gtag) {
//       window.gtag('event', 'add_to_cart', payload)
//     }
//   }

// }
