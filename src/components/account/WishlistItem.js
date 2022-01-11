import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { Grid, Box, Text, Heading, Button } from 'theme-ui'
import { useQuery } from 'urql'
import axios from 'axios'
import { CurrencyContext } from '../../contexts/CurrencyContext'
import { PRODUCT_ITEM_QUERY } from '../../queries/product'
import ShopifyGatsbyImage from '../ShopifyGatsbyImage'
import ProductTitle from '../ProductTitle'
import { useCurrentUser } from '../../hooks/user'
import ThemeLink from '../app/ThemeLink'

const WishlistItem = ({ handle, onRemove }) => {
  const [{ data: currentUser }] = useCurrentUser()
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
                console.log({ handle })
                await axios.delete(
                  `/api/user/${currentUser?.customer?.id || ''}/wishlist`,
                  {
                    data: {
                      productHandle: handle,
                    },
                  }
                )
                await onRemove()
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
  onRemove: PropTypes.func.isRequired,
}
export default WishlistItem
