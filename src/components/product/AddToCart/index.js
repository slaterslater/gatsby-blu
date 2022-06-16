import React, { useContext } from 'react'
import { Text, Button, Box, Grid } from 'theme-ui'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import ProductCTACallout from '../ProductCTACallout'
import { ProductContext } from '../ProductContext'
import NotifyModal from './NotifyModal'
import { useCart } from '../../../hooks/cart'
import { useProductPreorderMessage } from './util'
import WishlistButton from '../WishlistButton'

const AddToCart = ({ onAdded = () => {} }) => {
  const { handleClick, disabled, buttonText, isOn, toggleOn } = useCart(onAdded)
  const { product } = useContext(ProductContext)
  const preorderMessage = useProductPreorderMessage(product.metafields)

  return (
    <>
      {/* TBD whether sezzle group can use this?
      <Helmet>
        <script src="https://widget.sezzle.com/v1/javascript/price-widget?uuid=e6537e78-c3de-4cfa-8de6-a3bdde741681" />
      </Helmet> */}
      <Box>
        <ProductCTACallout pb={4} tags={product.tags} />
        <Grid sx={{ gridTemplateColumns: '1fr 48px', gap: '1px' }}>
          <Button
            disabled={disabled}
            type="button"
            onClick={handleClick}
            sx={{ flex: 1, fontSize: 1, py: 4, letterSpacing: 'widest' }}
          >
            {buttonText}
          </Button>
          <WishlistButton />
        </Grid>
        {preorderMessage && (
          <Box
            sx={{ textAlign: 'center', backgroundColor: 'cream' }}
            pt={1}
            pb={2}
            mt={4}
          >
            <Text sx={{ fontSize: 0, fontStyle: 'italic' }}>
              {preorderMessage}
            </Text>
          </Box>
        )}
      </Box>
      <NotifyModal {...{ isOn, toggleOn }} />
    </>
  )
}

export default AddToCart

AddToCart.propTypes = {
  onAdded: PropTypes.func,
}
