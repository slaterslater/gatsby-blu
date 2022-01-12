import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Grid, Box, Text, Heading, Button } from 'theme-ui'
import { useQuery } from 'urql'
import { CurrencyContext } from '../../contexts/CurrencyContext'
import { PRODUCT_ITEM_QUERY } from '../../queries/product'
import ShopifyGatsbyImage from '../ShopifyGatsbyImage'
import ProductTitle from '../ProductTitle'
import ThemeLink from '../app/ThemeLink'
import { useWishlist } from '../../hooks/wishlist'

const WishlistItem = ({ handle }) => {
  const { updateWishlist } = useWishlist()
  const [disabled, setDisabled] = useState(false)
  const { countryCode } = useContext(CurrencyContext)
  const [{ data }] = useQuery({
    query: PRODUCT_ITEM_QUERY,
    variables: { handle, countryCode },
  })

  if (!data) return <></>

  return (
    <Grid sx={{ gridTemplateColumns: `80px 1fr`, gap: 3 }}>
      <Box>
        {data.product?.images.edges[0] ? (
          <ShopifyGatsbyImage
            image={data.product.images.edges[0].node}
            getImageProps={{ width: 80 }}
          />
        ) : (
          <Box height={80} width={80} sx={{ bg: 'border' }} />
        )}
      </Box>
      <Box sx={{ alignSelf: 'center' }}>
        <Heading variant="h1" pb={1} sx={{ flex: 1, fontSize: 1 }}>
          <ThemeLink to={`/products/${handle}`}>
            <ProductTitle title={data.product.title} />
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
      </Box>
    </Grid>
  )
}

WishlistItem.propTypes = {
  handle: PropTypes.string.isRequired,
}
export default WishlistItem
