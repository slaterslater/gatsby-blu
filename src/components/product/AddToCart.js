import React, { useContext } from 'react'
import { Button, Flex, Box } from 'theme-ui'
import { useQuery, useMutation } from 'urql'
import { useMatch } from '@reach/router'
import { StoreContext } from '../../contexts/StoreContext'
import { DrawerContext } from '../drawers'
import { AddCheckoutLineItem } from '../../mutations/cart'
import { useGAEvent } from '../../lib/useGAEvent'
import { PRODUCT_QUERY } from '../../queries/product'
import ProductCTACallout from './ProductCTACallout'
import { useGtagAddToCart } from '../../hooks/gtag'

const getLatestVariant = (data, id) => {
  if (!id || !data?.productByHandle) return null

  const latestVariant = data.productByHandle.variants.edges.find(
    ({ node }) => node.id === id
  )

  return latestVariant.node
}

const AddToCart = ({ variant, tags, productType, customAttributes }) => {
  const { handle } = useMatch('/products/:handle')
  const [{ data, error }] = useQuery({
    query: PRODUCT_QUERY,
    variables: { handle },
  })

  const sendGAEvent = useGAEvent({
    category: productType,
    action: 'Added Product',
  })

  const [, setOpenDrawer] = useContext(DrawerContext)
  const { checkoutId } = useContext(StoreContext)
  const [{ fetching }, addCheckoutLineItem] = useMutation(AddCheckoutLineItem)
  const gtagAddToCart = useGtagAddToCart()

  const addToCart = async () => {
    sendGAEvent()
    const lineItems = [{ quantity: 1, variantId: variant.shopifyId }]
    const nextAttributes = customAttributes || []
    if (tags.includes('made-to-order')) {
      nextAttributes.push({
        key: 'made to order',
        value: 'allow 6-8 weeks production and delivery',
      })
    }
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
      gtagAddToCart(newEdge.node)
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
          {soldOut ? 'Sold Out' : 'Add To Cart'}
        </Button>
      </Flex>
    </Box>
  )
}

export default AddToCart
