import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Box, Text, Button, Flex, Link, IconButton } from 'theme-ui'
import { useQuery } from 'urql'
import { Link as GatsbyLink } from 'gatsby'
import { IoClose } from 'react-icons/io5'
import { CurrencyContext } from '../../contexts/CurrencyContext'
import { PRODUCT_ITEM_QUERY } from '../../queries/product'
import ShopifyGatsbyImage from '../ShopifyGatsbyImage'
import ProductTitle from '../ProductTitle'
import { useWishlist } from '../../hooks/wishlist'
import ProductProvider from '../product/ProductContext'

const WishlistItem = ({ handle }) => {
  const { updateWishlist } = useWishlist()
  const [disabled, setDisabled] = useState(false)
  const { countryCode } = useContext(CurrencyContext)
  const [{ data }] = useQuery({
    query: PRODUCT_ITEM_QUERY,
    variables: { handle, countryCode },
  })

  if (!data) return <></>

  const { product } = data

  console.log({ product })
  return (
    <>
      <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
        <IconButton
          p={0}
          ml="auto"
          mr={4}
          onClick={async () => {
            setDisabled(true)
            await updateWishlist(handle, 'DELETE')
          }}
          sx={{ cursor: 'pointer' }}
        >
          <Text as={IoClose} size={18} />
        </IconButton>
        {product?.images.edges[0] ? (
          <ShopifyGatsbyImage
            image={product.images.edges[0].node}
            getImageProps={{ width: 395, objectFit: 'cover' }}
          />
        ) : (
          <Box height={80} width={80} sx={{ bg: 'border' }} />
        )}
        <Box
          as={ProductProvider}
          handle={handle}
          initial={product}
          key={`${handle}-provider`}
          p={4}
        >
          <Link
            as={GatsbyLink}
            variant="small"
            sx={{
              fontWeight: 'bold',
              letterSpacing: 'widest',
              textAlign: 'center',
            }}
            to={`/products/${handle}`}
            py={3}
          >
            <ProductTitle title={product.title} />
          </Link>
          <Text>{`from ${
            product.priceRange.minVariantPrice.currencyCode
          } $${Math.ceil(product.priceRange.minVariantPrice.amount)} `}</Text>
        </Box>
      </Flex>
      {/* <Box sx={{ alignSelf: 'center' }}>
        <Heading variant="h1" pb={1} sx={{ flex: 1, fontSize: 1 }}>
          <ThemeLink to={`/products/${handle}`}>
            <ProductTitle title={product.title} />
          </ThemeLink>
          <Box pt={1}>
            <Button
              type="button"
              variant="link"
              onClick={async () => {
                setDisabled(true)
                await updateWishlist(handle, 'DELETE')
              }}
            >
              remove
            </Button>
          </Box>
        </Heading>
      </Box> */}
    </>
  )
}

WishlistItem.propTypes = {
  handle: PropTypes.string.isRequired,
}
export default WishlistItem
