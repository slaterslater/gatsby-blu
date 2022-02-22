import { useContext } from 'react'
import { useMutation } from 'urql'
import { DrawerContext } from '../components/drawers'
import {
  getProductAttributes,
  useProductPreorderMessage,
} from '../components/product/AddToCart/util'
import { ProductContext } from '../components/product/ProductContext'
import { useVariantPrice } from '../components/product/VariantPrice'
import { StoreContext } from '../contexts/StoreContext'
import { useSendAnalytics } from '../lib/useAnalytics'
import useToggle from '../lib/useToggle'
import { AddCheckoutLineItem } from '../mutations/cart'

export function useCart(onAdded = () => {}) {
  const sendAnalytics = useSendAnalytics('addToCart')
  const [isOn, toggleOn] = useToggle()
  const [, setOpenDrawer] = useContext(DrawerContext)
  const { checkoutId } = useContext(StoreContext)

  const { selectedVariant, product, quantity, customAttributes } =
    useContext(ProductContext)
  const price = useVariantPrice(selectedVariant || product.variants[0])
  const isPreorder = !!useProductPreorderMessage(product.metafields)

  const [{ data, fetching }, addCheckoutLineItem] =
    useMutation(AddCheckoutLineItem)

  const addToCart = async () => {
    const lineItems = [{ quantity, variantId: selectedVariant.shopifyId }]
    const nextAttributes = [
      ...(customAttributes || []),
      ...getProductAttributes(product),
    ]

    if (nextAttributes.length) {
      lineItems[0].customAttributes = nextAttributes
    }
    const cart = await addCheckoutLineItem({
      checkoutId,
      lineItems,
    })
    const addedItem =
      cart.data.checkoutLineItemsAdd.checkout.lineItems.edges.find(
        ({ node }) => node.variant.id === lineItems[0].variantId
      ).node

    setOpenDrawer('cart')
    onAdded()
    sendAnalytics(addedItem)
  }

  const getButtonState = () => {
    const defaults = {
      handleClick: addToCart,
      buttonText: `${isPreorder ? 'pre-order' : 'Add To Bag'} - ${price}`,
      disabled: false,
    }

    switch (true) {
      case fetching:
        return { ...defaults, disabled: true }
      case !selectedVariant:
        return { ...defaults, disabled: true }
      case !selectedVariant.availableForSale && !product.willRestock:
        return { ...defaults, disabled: true, buttonText: 'Sold Out' }
      case !selectedVariant.availableForSale &&
        product.willRestock?.value === 'false':
        return { ...defaults, disabled: true, buttonText: 'Sold Out' }
      case selectedVariant &&
        !selectedVariant.availableForSale &&
        product.willRestock?.value === 'true':
        return { ...defaults, handleClick: toggleOn, buttonText: 'Notify Me' }
      default:
        return defaults
    }
  }

  const { handleClick, disabled, buttonText } = getButtonState()

  return { handleClick, disabled, buttonText, isOn, toggleOn }
}
