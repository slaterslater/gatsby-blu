import React, { useContext, useMemo } from 'react'
import { Box, Button, Flex, Grid, IconButton } from 'theme-ui'
import { useMutation } from 'urql'
import { IoClose } from 'react-icons/io5'
import FormattedPrice from './FormattedPrice'
import { ThumbnailImage } from './product/ListItem'
import { DrawerContext } from './drawers'
import { AddCartLines } from '../mutations/cart'
import { getProductAttributes } from './product/AddToCart/util'
import { StoreContext } from '../contexts/StoreContext'

const CustomSetChoice = ({ customSet, setCustomSet }) => {
  const { cartId } = useContext(StoreContext)
  const { setOpenDrawer } = useContext(DrawerContext)
  const [, addCartLines] = useMutation(AddCartLines)

  const setPrice = useMemo(() => {
    const total = customSet.reduce((sum, product) => {
      const price = Number(product.priceRangeV2.minVariantPrice.amount)
      return sum + price
    }, 0)
    return String(total)
  }, [customSet])

  if (customSet.length === 0) return null

  const addSetToBag = async () => {
    const lines = customSet.map(({ variants, metafields }) => ({
      merchandiseId: variants[0].id,
      quantity: 1,
      attributes: getProductAttributes({ metafields }),
    }))

    const cart = await addCartLines({
      cartId,
      lines,
    })

    // analytics here ?
    setOpenDrawer('cart')
    setCustomSet([])
  }

  const removeFromCustomSet = n => {
    const modifedSet = customSet.filter((x, i) => i !== n)
    setCustomSet(modifedSet)
  }

  const SIZE = [100, 110, 125]

  return (
    <Box
      sx={{
        width: '100%',
        bg: 'prodBackground',
        borderBottom: '5px solid white',
        position: '-webkit - sticky',
        position: 'sticky',
        top: [65, 95],
        zIndex: 5,
      }}
    >
      <Grid
        sx={{
          gridTemplateColumns: ['1fr', '1fr', '115px 1fr 115px'],
          gap: 0,
          maxWidth: 1100,
        }}
        px={[2, 6, 6, 7]}
        pb={[0, 0, 3]}
        mx="auto"
      >
        <Flex
          sx={{
            flexWrap: 'wrap',
            justifyContent: 'center',
            gridColumnStart: [null, null, 2],
            maxWidth: ['100%', 500, '100%'],
          }}
          px={[0, 5, 0]}
          mx="auto"
        >
          {customSet.map((product, n) => (
            <Box key={product.id}>
              <Box
                sx={{
                  borderRadius: '50%',
                  width: SIZE,
                  height: SIZE,
                  overflow: 'hidden',
                }}
              >
                <ThumbnailImage fallbackAlt="" image={product.thumb} />
              </Box>
              <IconButton
                type="button"
                sx={{
                  display: 'block',
                  width: 45,
                  height: 45,
                  borderRadius: '50%',
                  transform: 'translateY(-20px)',
                  marginBottom: '-20px',
                }}
                mx="auto"
                onClick={() => removeFromCustomSet(n)}
                aria-label={`remove ${product.title} from custom set`}
              >
                <Box
                  as={IoClose}
                  sx={{ color: '#B2A79A', bg: 'cream', borderRadius: '50%' }}
                  size={15}
                />
              </IconButton>
            </Box>
          ))}
        </Flex>
        <Flex
          sx={{
            flexDirection: ['row', 'row', 'column'],
            justifyContent: 'flex-end',
            // justifyContent: 'center',
            alignItems: 'center',
            fontSize: 1,
            fontWeight: 'heading',
            letterSpacing: 'wider',
            button: { width: 115, margin: 4, marginLeft: [null, null, 0] },
            // button: { width: 115, margin: [4, 4, 0] },
            // button: { width: 115, marginTop: [0, 0, 4], marginLeft: [4, 4, 0] },
          }}
          pb={2}
          mx="auto"
        >
          <FormattedPrice priceV2={setPrice} />
          <Button variant="inverted" onClick={addSetToBag}>
            add to bag
          </Button>
        </Flex>
      </Grid>
    </Box>
  )
}

export default CustomSetChoice
