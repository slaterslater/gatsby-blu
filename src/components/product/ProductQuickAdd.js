import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Flex } from 'theme-ui'
import { useMutation } from 'urql'
import { useMetafieldValue } from '../../hooks/useMetafield'
import { metals } from '../../data/metals'
import { AddCartLines } from '../../mutations/cart'
import { StoreContext } from '../../contexts/StoreContext'
import { DrawerContext } from '../drawers'

const ProductQuickAdd = ({
  variants,
  metafields,
  isQuickAdding,
  setIsQuickAdding,
}) => {
  const { cartId } = useContext(StoreContext)
  const { setOpenDrawer } = useContext(DrawerContext)
  const [isOn, setIsOn] = useState(false)
  const offersPairs = useMetafieldValue('offers_pairs', metafields)
  const [{ data, fetching }, addCartLines] =
    useMutation(AddCartLines)

  const quickAddToCart = async lines => {
    const cart = await addCartLines({
      cartId,
      lines,
    })
    setOpenDrawer('cart')
    // do something with analytics?
  }

  useEffect(() => {
    if (isQuickAdding) return
    setIsOn(false)
  }, [isQuickAdding])

  if (!variants) return null

  const notMetalIndex = variants[0].selectedOptions.findIndex(
    ({ value }) => !metals.includes(value.toLowerCase())
  )

  let buttons = []

  switch (true) {
    case offersPairs === 'true':
      buttons = ['single', 'pair'].map((text, i) => ({
        variantId: variants[0].id,
        borderColor: 'cream',
        text,
        quantity: i + 1,
      }))
      break
    case notMetalIndex >= 0 && variants.length > 1:
      buttons = variants.map(variant => ({
        variantId: variant.id,
        borderColor: 'cream',
        text: variant.selectedOptions[notMetalIndex].value,
        quantity: 1,
      }))
      break
    default:
      buttons = [
        {
          variantId: variants[0].id,
          borderColor: 'prodBackground',
          text: 'add to bag',
          quantity: 1,
        },
      ]
  }

  return (
    <Flex
      id="quickAdd"
      onClick={e => e.preventDefault()}
      onMouseOver={() => {
        setIsOn(true)
        setIsQuickAdding(true)
      }}
      sx={{
        width: '94%',
        marginLeft: '3%',
        marginRight: '3%',
        position: 'absolute',
        zIndex: 2,
        bottom: 1,
        fontSize: 0,
        justifyContent: 'center',
        textAlign: 'center',
        flexWrap: 'wrap',
        color: 'primary',
        textTransform: 'uppercase',
        letterSpacing: 'wider',
        div: {
          width: '100%',
          bg: 'prodBackground',
          paddingTop: 1,
          paddingBottom: 1,
          margin: 4,
        },
        button: {
          bg: 'prodBackground',
          paddingTop: 1,
          paddingBottom: 1,
          marginTop: 1,
          marginBottom: 1,
        },
      }}
    >
      <Box>
        {!isOn && (
          <Button
            variant="inverted"
            sx={{ borderColor: 'prodBackground' }}
            py={1}
            my={1}
          >
            + quick add
          </Button>
        )}
        {isOn &&
          buttons.map(({ variantId, text, borderColor, quantity }, i) => (
            <Button
              key={`quickadd-${i}`}
              onClick={() => quickAddToCart({ merchandiseId: variantId, quantity })}
              variant="inverted"
              sx={{
                borderColor,
                ':hover': { bg: 'primary', color: 'cream' },
              }}
              py={1}
              my={1}
              mx="2px"
            >
              {text}
            </Button>
          ))}
      </Box>
    </Flex>
  )
}

export default ProductQuickAdd
