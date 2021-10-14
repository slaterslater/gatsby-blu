import React, { useContext, useMemo } from 'react'
import { Text, Button, Flex, Box } from 'theme-ui'
import { useMutation } from 'urql'
import { StoreContext } from '../../../contexts/StoreContext'
import { DrawerContext } from '../../drawers'
import { AddCheckoutLineItem } from '../../../mutations/cart'
import ProductCTACallout from '../ProductCTACallout'
import { useSendAnalytics } from '../../../lib/useAnalytics'
import useToggle from '../../../lib/useToggle'
import { ProductContext } from '../ProductContext'
import { getTagAttributes, useProductPreorderMessage } from './util'
import NotifyModal from './NotifyModal'
import { useVariantPrice } from '../VariantPrice'

const AddToCart = ({ customAttributes, onAdded = () => {} }) => {
  const { selectedVariant, product, quantity } = useContext(ProductContext)
  const price = useVariantPrice(selectedVariant || product.variants[0])

  const preorderMessage = useProductPreorderMessage(product.tags)

  const sendAnalytics = useSendAnalytics('addToCart')

  const [, setOpenDrawer] = useContext(DrawerContext)
  const { checkoutId } = useContext(StoreContext)

  // some kind of issue with useMutation: fetching only updates if you're also requesting data
  // i'm feeling strongly we should switch to graphql-request library + swr
  const [{ data, fetching }, addCheckoutLineItem] = useMutation(
    AddCheckoutLineItem
  )

  const [isOn, toggleOn] = useToggle()

  const addToCart = async () => {
    const lineItems = [{ quantity, variantId: selectedVariant.shopifyId }]

    const nextAttributes = [
      ...(customAttributes || []),
      ...getTagAttributes(product.tags),
    ]

    if (nextAttributes.length) {
      lineItems[0].customAttributes = nextAttributes
    }
    addCheckoutLineItem({
      checkoutId,
      lineItems,
    }).then(({ data }) => {
      const [
        newEdge,
      ] = data.checkoutLineItemsAdd.checkout.lineItems.edges.slice(-1)

      setOpenDrawer('cart')
      onAdded()
      sendAnalytics(newEdge.node)
    })
  }

  const getButtonState = () => {
    const defaults = {
      handleClick: addToCart,
      buttonText: `Add To Cart - ${price}`,
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

  // console.log(selectedVariant)
  const { handleClick, disabled, buttonText } = getButtonState()

  return (
    <>
      <Box>
        {!disabled && <ProductCTACallout pb={4} tags={product.tags} />}
        <Flex>
          <Button
            disabled={disabled}
            type="button"
            onClick={handleClick}
            sx={{ flex: 1, fontSize: 1, py: 4, letterSpacing: 'widest' }}
          >
            {buttonText}
          </Button>
        </Flex>
        {preorderMessage && (
          <Box sx={{ textAlign: 'center' }} pt={2}>
            <Text sx={{ fontSize: 0, fontStyle: 'italic' }}>
              {preorderMessage}
            </Text>
          </Box>
        )}
      </Box>
      <NotifyModal {...{ isOn, toggleOn }} />
    </>
  )
}

export default AddToCart
