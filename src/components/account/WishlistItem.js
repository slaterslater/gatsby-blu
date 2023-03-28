import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Box, Text, Flex, Link } from 'theme-ui'
import { useQuery } from 'urql'
import { Link as GatsbyLink } from 'gatsby'
import { IoIosClose } from 'react-icons/io'
import { CurrencyContext } from '../../contexts/CurrencyContext'
import { PRODUCT_ITEM_QUERY } from '../../queries/product'
import ShopifyGatsbyImage from '../ShopifyGatsbyImage'
import ProductTitle from '../ProductTitle'
import { useWishlist } from '../../hooks/wishlist'
import ProductModal from '../product/ProductModal'

const WishlistItem = ({ handle }) => {
  const { removeFromWishlist } = useWishlist()
  const [disabled, setDisabled] = useState(false)
  const { countryCode } = useContext(CurrencyContext)
  const [{ data }] = useQuery({
    query: PRODUCT_ITEM_QUERY,
    variables: { handle, countryCode },
  })

  if (data?.product == null) return <></>

  const {
    product: { title, images, priceRangeV2 },
  } = data

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        justifyContent: 'flex-end',
        textAlign: 'center',
      }}
      pb={6}
    >
      <Box>
        {images.edges[0] ? (
          <ShopifyGatsbyImage
            image={images.edges[0].node}
            getImageProps={{ width: '395px' }}
            gatsbyImageProps={{ height: '395', objectFit: 'contain' }}
          />
        ) : (
          <Box height={80} width={80} sx={{ bg: 'border' }} />
        )}
      </Box>
      <Flex
        onClick={async () => {
          setDisabled(true)
          await removeFromWishlist(handle)
        }}
        sx={{
          cursor: 'pointer',
          justifyContent: 'center',
        }}
        mb={[5, 6]}
      >
        <Text
          as={IoIosClose}
          size={18}
          mr={2}
          sx={{ backgroundColor: 'bbBackground' }}
        />
        <Text sx={{ fontSize: 0 }}>remove</Text>
      </Flex>
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
        <ProductTitle title={title} />
      </Link>
      <Text mt="auto" py={1}>
        {`from ${priceRangeV2.minVariantPrice.currencyCode} $${Math.ceil(
          priceRangeV2.minVariantPrice.amount
        )} `}
      </Text>
      <ProductModal handle={handle}>
        <Text
          variant="caps"
          sx={{
            display: 'block',
            fontWeight: 'bold',
            textDecoration: 'underline',
          }}
          pt={4}
        >
          Add to bag
        </Text>
      </ProductModal>
    </Flex>
  )
}

WishlistItem.propTypes = {
  handle: PropTypes.string.isRequired,
}
export default WishlistItem
