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
  const { setOpenDrawer } = useContext(DrawerContext)
  const { checkoutId } = useContext(StoreContext)

  const { selectedVariant, product, quantity, customAttributes, stack } =
    useContext(ProductContext)
  const price = useVariantPrice(selectedVariant || product.variants[0])
  const isPreorder = !!useProductPreorderMessage(product.metafields)

  const [{ data, fetching }, addCheckoutLineItem] =
    useMutation(AddCheckoutLineItem)

  const addToCart = async (shouldOpen = true) => {
    const lineItems = [{ quantity, variantId: selectedVariant.shopifyId }]
    const nextAttributes = [
      ...(customAttributes || []),
      ...getProductAttributes(product, selectedVariant),
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

    if (shouldOpen) setOpenDrawer('cart')
    onAdded()
    sendAnalytics(addedItem)
  }

  const addStackToCart = async () => {
    const shouldOpen = false
    await addToCart(shouldOpen)

    const offersPairs = product.offersPairs?.value === 'true'
    const selectedOptions = selectedVariant?.selectedOptions.filter(
      option => option.name.toLowerCase() !== 'metal'
    )
    const fractionSize = customAttributes.find(
      attr => attr.key === 'size'
    )?.value

    const stackVariants = stack
      .map(stackProduct => {
        let stackVariant = {
          shopifyId: stackProduct.variants[0].shopifyId,
          availableForSale: stackProduct.variants[0].availableForSale,
          quantity: 1,
          tags: stackProduct.tags,
          metafields: stackProduct.metafields,
          customAttributes: [],
        }

        // inconsistent name fields...
        const hasOptions =
          stackProduct.options.filter(
            option =>
              option.name.toLowerCase() !== 'metal' &&
              option.values?.some(value => !value.match(/single|pair/i))
          )?.length > 0

        if (selectedOptions.length && hasOptions) {
          if (fractionSize) {
            const hasFractions = stackProduct.metafields.some(
              ({ key, value }) => key === 'fractional_sizes' && value === 'true'
            )
            const fractionAttribute = [{ key: 'size', value: fractionSize }]
            stackVariant.customAttributes = hasFractions
              ? fractionAttribute
              : []
          }
          // match values because inconsistent name fields
          const stackVariantWithSimilarOption = stackProduct.variants.find(
            variant =>
              variant.selectedOptions.some(({ value }) =>
                selectedOptions.some(option => option.value === value)
              )
          )
          const {
            shopifyId,
            availableForSale,
            selectedOptions: options,
          } = stackVariantWithSimilarOption || {}
          stackVariant = {
            ...stackVariant,
            shopifyId,
            availableForSale,
            selectedOptions: options,
          }
        }

        if (offersPairs) {
          const variantOffersPairs =
            stackProduct.metafields.find(
              field => field.key.toLowerCase() === 'offers_pairs'
            )?.value === 'true'
          if (variantOffersPairs && quantity % 2 === 0)
            stackVariant.quantity = 2
        }

        return stackVariant
      })
      .filter(
        ({ shopifyId, availableForSale }) => availableForSale && shopifyId
      )

    const lineItems = stackVariants.map(variant => ({
      variantId: variant.shopifyId,
      quantity: variant.quantity,
      customAttributes: [
        ...variant.customAttributes,
        ...getProductAttributes(
          {
            tags: variant.tags,
            metafields: variant.metafields,
          },
          // a little smelly, but need a way to determine size for mto callout...
          { selectedOptions: variant.selectedOptions }
        ),
      ],
    }))

    const cart = await addCheckoutLineItem({
      checkoutId,
      lineItems,
    })

    setOpenDrawer('cart')
    onAdded()
    // send analytics for each
    stackVariants.forEach(item => {
      const addedItem =
        cart.data.checkoutLineItemsAdd.checkout.lineItems.edges.find(
          ({ node }) => node.variant.id === item.shopifyId
        ).node
      sendAnalytics(addedItem)
    })
  }

  const getButtonState = () => {
    const defaults = {
      handleClick: addToCart,
      buttonText: `${isPreorder ? 'pre-order' : 'Add To Bag'} - ${price}`,
      disabled: false,
    }
    const productIsNew = product.tags.some(tag => tag.toLowerCase() === 'new')
    const mto = product.tags.some(tag => tag.toLowerCase() === 'made-to-order')

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
        product.willRestock?.value === 'true' &&
        !mto:
        return {
          ...defaults,
          handleClick: toggleOn,
          buttonText: productIsNew ? 'coming soon!' : 'join the waitlist',
        }
      default:
        return defaults
    }
  }

  const { handleClick, disabled, buttonText } = getButtonState()

  return { handleClick, disabled, buttonText, isOn, toggleOn, addStackToCart }
}
