import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useContext, useMemo, useState } from 'react'
import { Box, Button, Flex, Grid, IconButton, Text } from 'theme-ui'
import { useMutation } from 'urql'
import { BiCaretLeft, BiCaretRight } from 'react-icons/bi'
import { wrap } from '@popmotion/popcorn'
import { Link as GatsbyLink } from 'gatsby'
import { useShopifyImage } from '../../hooks/shopifyImage'
import { useProductTitle } from '../ProductTitle'
import { AddCheckoutLineItem } from '../../mutations/cart'
import { useFormattedPrice } from '../FormattedPrice'
import { CurrencyContext } from '../../contexts/CurrencyContext'

const AddOnProduct = ({ product, addOntoCart, currencyCode }) => {
  const variant = product.variants.nodes[0]
  const title = useProductTitle(product.title)
  const variantPrice = useFormattedPrice({
    amount: variant.priceV2.amount,
    currencyCode,
  })
  const imageData = useShopifyImage({
    image: product.images.nodes[0],
    width: 225,
  })

  return (
    <Grid
      sx={{
        gridTemplateColumns: ['115px 185px', 225],
        gap: 0,
        span: { display: 'block' },
        fontSize: [0, 1],
      }}
      mx="auto"
    >
      <GatsbyLink to={`/products/${product.handle}`}>
        <GatsbyImage image={imageData} alt="" />
      </GatsbyLink>
      <Flex
        sx={{
          textAlign: 'center',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: 100,
        }}
        my={[0, 4]}
      >
        <Box sx={{ display: ['block', 'none'] }} mb={2}>
          <YouMightLike />
        </Box>
        <Text
          variant="caps"
          sx={{
            fontFamily: 'heading',
            maxWidth: 180,
          }}
          mx="auto"
        >
          {title}
        </Text>
        <Text sx={{ fontWeight: 'heading' }}>{variantPrice}</Text>
        <Button
          variant="inverted"
          onClick={() => addOntoCart(variant.id)}
          py={2}
          sx={{ width: 125 }}
          mx="auto"
        >
          add to bag
        </Button>
      </Flex>
    </Grid>
  )
}

const AddOns = ({ products, cartId }) => {
  const MAX = products.length - 1
  const SIZE = 4 // number of products to recommend

  const [current, setCurrent] = useState(0)

  const setCurrentProduct = n => {
    setCurrent(wrap(0, SIZE, current + n))
  }

  const { currencyCode } = useContext(CurrencyContext)

  const [{ data, fetching }, addCheckoutLineItem] =
    useMutation(AddCheckoutLineItem)

  const addOns = useMemo(() => {
    if (!products.length) return []

    const randomNums = new Set()
    while (randomNums.size < SIZE) {
      const num = Math.round(Math.random() * MAX)
      randomNums.add(num)
    }

    return Array.from(randomNums).map(n => products[n])
  }, [])

  const addOntoCart = async variantId => {
    const lineItems = [{ quantity: 1, variantId }]
    const cart = await addCheckoutLineItem({
      cartId,
      lineItems,
    })
    // do something with analytics?
  }

  if (!addOns.length) return null
  return (
    <Box
      sx={{
        width: [360, 300, 360],
        height: [140, '100vh'],
        bg: '#F9F5F0',
        position: ['relative', 'absolute'],
        transform: [null, 'translateX(-300px)', 'translateX(-360px)'],
        overflow: 'scroll',
      }}
      py={[0, 5]}
      mb={3}
    >
      {/* DESKTOP */}
      <Box
        sx={{
          display: ['none', 'flex'],
          flexDirection: 'column',
          textAlign: 'center',
        }}
      >
        <YouMightLike />
        {addOns.map(product => (
          <AddOnProduct
            key={product.id}
            product={product}
            addOntoCart={addOntoCart}
            currencyCode={currencyCode}
          />
        ))}
      </Box>
      {/* MOBILE */}
      <Flex
        sx={{
          display: ['flex', 'none'],
          alignItems: 'center',
          height: '100%',
        }}
      >
        <IconButton
          type="button"
          onClick={() => setCurrentProduct(-1)}
          sx={{ outline: 'none' }}
        >
          <BiCaretLeft size={16} />
        </IconButton>
        <AddOnProduct
          product={addOns[current]}
          addOntoCart={addOntoCart}
          currencyCode={currencyCode}
        />
        <IconButton
          type="button"
          onClick={() => setCurrentProduct(1)}
          sx={{ outline: 'none' }}
        >
          <BiCaretRight size={16} />
        </IconButton>
        {/* <IconButton
          type="button"
          // onClick={() => setCurrentProduct(1)}
          sx={{ outline: 'none', position: 'absolute', top: 0, right: 0 }}
        >
          <IoIosClose size={20} />
        </IconButton> */}
      </Flex>
    </Box>
  )
}

export default AddOns

const YouMightLike = () => (
  <Text
    sx={{
      display: 'block',
      fontFamily: 'heading',
      fontStyle: 'italic',
      fontSize: [0, 3],
      letterSpacing: 'widest',
    }}
    pb={[0, 5]}
  >
    you might also like
  </Text>
)
