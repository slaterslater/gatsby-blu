import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Box, Text, Flex, Link, IconButton } from 'theme-ui'
import { useQuery } from 'urql'
import { Link as GatsbyLink } from 'gatsby'
import { IoClose } from 'react-icons/io5'
import { CurrencyContext } from '../../contexts/CurrencyContext'
import { PRODUCT_ITEM_QUERY } from '../../queries/product'
import ShopifyGatsbyImage from '../ShopifyGatsbyImage'
import ProductTitle from '../ProductTitle'
import { useWishlist } from '../../hooks/wishlist'
import ProductModal from '../product/ProductModal'

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
  return (
    <>
      <Flex
        sx={{ flexDirection: 'column', alignItems: 'center', height: '100%' }}
      >
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
        <Box my="auto">
          {product?.images.edges[0] ? (
            <ShopifyGatsbyImage
              image={product.images.edges[0].node}
              getImageProps={{ width: 395, objectFit: 'cover' }}
            />
          ) : (
            <Box height={80} width={80} sx={{ bg: 'border' }} />
          )}
        </Box>
        <Flex sx={{ flexDirection: 'column', textAlign: 'center' }}>
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
            mt="auto"
          >
            <ProductTitle title={product.title} />
          </Link>
          <Text>
            {`from ${
              product.priceRange.minVariantPrice.currencyCode
            } $${Math.ceil(product.priceRange.minVariantPrice.amount)} `}
          </Text>
          <ProductModal handle={handle}>
            <Text
              variant="caps"
              sx={{
                display: 'block',
                fontWeight: 'bold',
                textDecoration: 'underline',
              }}
              py={4}
            >
              Add to bag
            </Text>
          </ProductModal>
        </Flex>
      </Flex>
    </>
  )
}

WishlistItem.propTypes = {
  handle: PropTypes.string.isRequired,
}
export default WishlistItem
