import React, { useContext } from 'react'
import { Button, Flex, Box } from 'theme-ui'
import { useQuery, useMutation } from 'urql'
import { useMatch } from '@reach/router'
import { StoreContext } from '../../contexts/StoreContext'
import { DrawerContext } from '../drawers'
import { AddCheckoutLineItem } from '../../mutations/cart'
import { useGAEvent } from '../../lib/useGAEvent'
import { PRODUCT_QUERY } from '../../queries/product'

const getLatestVariant = (data, id) => {
  if (!id || !data?.productByHandle) return null

  const latestVariant = data.productByHandle.variants.edges.find(
    ({ node }) => node.id === id
  )

  return latestVariant.node
}

const AddToCart = ({ variant, productType }) => {
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

  const addToCart = async ({ customAttributes = [] }) => {
    sendGAEvent()
    const lineItems = [{ quantity: 1, variantId: variant.shopifyId }]
    if (customAttributes.length) {
      lineItems[0].customAttributes = customAttributes
    }
    addCheckoutLineItem({
      checkoutId,
      lineItems,
    }).then(() => {
      setOpenDrawer('cart')
    })
  }

  const latestVariant = getLatestVariant(data, variant?.shopifyId)
  const soldOut = latestVariant && !latestVariant.availableForSale

  return (
    <Box py={4}>
      <Flex pt={4}>
        <Button
          disabled={!variant || soldOut || fetching}
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
