import React, { useContext, useMemo } from 'react'
import { Text, Button, Flex, Box } from 'theme-ui'
import { useQuery, useMutation } from 'urql'
import { useMatch } from '@reach/router'
import { DateTime } from 'luxon'
import { StoreContext } from '../../contexts/StoreContext'
import { DrawerContext } from '../drawers'
import { AddCheckoutLineItem } from '../../mutations/cart'
import { PRODUCT_QUERY } from '../../queries/product'
import ProductCTACallout from './ProductCTACallout'
import { useSendAnalytics } from '../../lib/useAnalytics'

const getLatestVariant = (data, id) => {
  if (!id || !data?.productByHandle) return null

  const latestVariant = data.productByHandle.variants.edges.find(
    ({ node }) => node.id === id
  )

  return latestVariant.node
}

const getPreorderMessage = tag => {
  if (tag.includes('pre-order')) {
    const [, isoDate] = tag.split(':')
    const preorderDate = DateTime.fromISO(isoDate)
    const now = DateTime.now()

    if (preorderDate < now) return null
    const format = 'MMM d'
    return `expected to ship week of ${preorderDate.toFormat(format)}`
  }
  return null
}

const getTagAttributes = tags =>
  tags.reduce((acc, tag) => {
    if (tag.includes('made-to-order')) {
      return [
        ...acc,
        {
          key: 'made to order',
          value: 'allow 6-8 weeks production and delivery',
        },
      ]
    }

    if (tag.includes('pre-order')) {
      const message = getPreorderMessage(tag)
      if (!message) return acc

      return [
        ...acc,
        {
          key: 'pre-order',
          value: message,
        },
      ]
    }
    return acc
  }, [])

const useProductPreorderMessage = tags =>
  useMemo(
    () =>
      tags.reduce((acc, tag) => {
        const message = getPreorderMessage(tag)
        return message || acc
      }, ''),
    tags
  )

const AddToCart = ({ variant, tags, productType, customAttributes }) => {
  const { handle } = useMatch('/products/:handle')
  const [{ data, error }] = useQuery({
    query: PRODUCT_QUERY,
    variables: { handle },
  })

  const preorderMessage = useProductPreorderMessage(tags)
  // console.log(preorderMessage)
  // check tags for pre-order

  const sendAnalytics = useSendAnalytics('addToCart')

  const [, setOpenDrawer] = useContext(DrawerContext)
  const { checkoutId } = useContext(StoreContext)
  const [{ fetching }, addCheckoutLineItem] = useMutation(AddCheckoutLineItem)
  const addToCart = async () => {
    const lineItems = [{ quantity: 1, variantId: variant.shopifyId }]

    const nextAttributes = [
      ...(customAttributes || []),
      ...getTagAttributes(tags),
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
      sendAnalytics(newEdge.node)
    })
  }

  const latestVariant = getLatestVariant(data, variant?.shopifyId)
  const soldOut = latestVariant && !latestVariant.availableForSale
  const disabled = !variant || soldOut || fetching

  return (
    <Box py={4}>
      {!disabled && <ProductCTACallout pb={4} tags={tags} />}
      <Flex>
        <Button
          disabled={disabled}
          type="button"
          onClick={addToCart}
          sx={{ flex: 1, fontSize: 1, py: 4 }}
        >
          {soldOut ? 'Sold Out' : preorderMessage ? 'Preorder' : 'Add To Cart'}
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
  )
}

export default AddToCart
