import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useContext, useState } from 'react'
import { Box, Button, Flex, Grid, IconButton, Text } from 'theme-ui'
import { IoClose } from 'react-icons/io5'
import { useShopifyImage } from '../../hooks/shopifyImage'
import { useProductTitle } from '../ProductTitle'
import { useFormattedPrice } from '../FormattedPrice'
import { CurrencyContext } from '../../contexts/CurrencyContext'

const LineItemUpgrade = ({
  currentAmount,
  upgrade,
  repalaceItemWithUpgrade,
}) => {
  const { currencyCode } = useContext(CurrencyContext)
  const [isOpen, setIsOpen] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  const { product, priceV2 } = upgrade
  const amount = priceV2?.amount - currentAmount

  const title = useProductTitle(product.title)
  const priceIncrease = useFormattedPrice({
    amount,
    currencyCode,
  })
  const imageData = useShopifyImage({
    image: product.images.nodes[0],
    width: 125,
  })

  if (dismissed) return null
  return (
    <>
      <Box
        sx={{
          width: 0,
          height: 0,
          borderLeft: '15px solid transparent',
          borderRight: '15px solid transparent',
          borderBottom: '15px solid #F9F5F0',
        }}
        ml={5}
      />
      {!isOpen && (
        <Flex
          py={1}
          pl={5}
          sx={{
            bg: '#F9F5F0',
            cursor: 'pointer',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onClick={() => setIsOpen(true)}
        >
          <Text
            role="button"
            aria-label="upgrade available"
            variant="caps"
            sx={{
              display: 'block',
              fontFamily: 'heading',
            }}
          >
            upgrade available
          </Text>
          <IconButton
            type="button"
            aria-label="Close"
            onClick={() => setDismissed(true)}
            sx={{
              outline: 'none',
              cursor: 'pointer',
              zIndex: 100,
            }}
          >
            <IoClose size={12} />
          </IconButton>
        </Flex>
      )}
      {isOpen && (
        <Grid sx={{ bg: '#F9F5F0', gridTemplateColumns: '1fr 125px' }}>
          <Flex
            sx={{ flexDirection: 'column', justifyContent: 'space-evenly' }}
            pl={5}
          >
            <Text
              variant="caps"
              sx={{
                display: 'block',
                fontFamily: 'heading',
                whiteSpace: 'pre-line',
              }}
            >
              {`upgrade\n`}
              {title}
            </Text>
            <Text sx={{ fontWeight: 'heading' }}>+{priceIncrease}</Text>
            <Button
              variant="inverted"
              onClick={() => {
                repalaceItemWithUpgrade()
                setDismissed(true)
              }}
              py={2}
              sx={{ width: 125 }}
            >
              upgrade
            </Button>
          </Flex>
          <GatsbyImage image={imageData} alt="" />
        </Grid>
      )}
    </>
  )
}

export default LineItemUpgrade
