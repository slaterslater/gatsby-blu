import { useEffect } from 'react'

export function useGtagViewItemList(products, itemListName, itemListId) {
  useEffect(() => {
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

    if (window.gtag) {
      window.gtag('event', 'view_item_list', {
        items: formatProductItems(products),
      })
    }
  }, [])
}

// export function useGtagViewItem(product) {
//   useEffect(() => {
//     if (window.gtag) {
//       window.gtag('event', 'view_item_list', {
//         items: formatProductItems(products),
//       })
//     }
//   }, [])
// }
