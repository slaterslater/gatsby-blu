import React, { useEffect, useContext } from 'react'
import { Flex, Text, Button } from 'theme-ui'
// import { useCart } from '../../hooks/cart'
import { DrawerContext } from '../drawers'
import { ProductContext } from './ProductContext'

const ProductAvailabilityButton = () => {
  // const { buttonText } = useCart()
  // const [viewed, setViewed] = useState(false)
  const {
    product: { handle },
  } = useContext(ProductContext)
  const { openDrawer, setOpenDrawer, setProductHandle } =
    useContext(DrawerContext)

  useEffect(() => {
    if (!handle) return
    setProductHandle(handle)
  }, [handle, setProductHandle])

  // useEffect(() => {
  //   if (viewed || buttonText !== 'Sold Out') return
  //   setOpenDrawer('availablity')
  //   setViewed(true)
  // }, [buttonText, viewed, setOpenDrawer])

  return (
    <Flex sx={{ gap: 3, alignItems: 'baseline' }} pb={2}>
      <Text
        as="small"
        sx={{
          fontSize: 0,
          letterSpacing: 'widest',
          textTransform: 'lowercase',
          lineHeight: '1.5em',
        }}
      >
        pickup in-store:
      </Text>
      <Button
        type="button"
        onClick={() => {
          setOpenDrawer('availability')
        }}
        variant="link"
        disabled={!!openDrawer}
        sx={{
          fontWeight: '600',
          fontSize: 0,
          letterSpacing: 'widest',
        }}
      >
        check availability
      </Button>
    </Flex>
  )
}

export default ProductAvailabilityButton
