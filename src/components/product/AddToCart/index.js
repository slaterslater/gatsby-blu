import React, { useContext } from 'react'
import { Text, Button, Box, Grid } from 'theme-ui'
import PropTypes from 'prop-types'
import ProductCTACallout from '../ProductCTACallout'
import { ProductContext } from '../ProductContext'
import NotifyModal from './NotifyModal'
import { useCart } from '../../../hooks/cart'
import { useProductPreorderMessage } from './util'
import WishlistButton from '../WishlistButton'
import AddStackButton from '../AddStackButton'
import { usePageContext } from '../../../contexts/PageContext'

const AddToCart = ({ onAdded = () => {} }) => {
  const { handleClick, disabled, buttonText, isOn, toggleOn } = useCart(onAdded)
  const { product } = useContext(ProductContext)
  const { isBeloved } = usePageContext()
  const preorderMessage = useProductPreorderMessage(product.metafields)

  return (
    <>
      <Box>
        <ProductCTACallout pb={4} />
        <Grid sx={{ gridTemplateColumns: '1fr 48px', gap: '1px' }}>
          <Button
            disabled={disabled}
            type="button"
            onClick={handleClick}
            sx={{ flex: 1, fontSize: 1, py: 4, letterSpacing: 'widest' }}
            bg={isBeloved ? 'navy' : 'primary'}
          >
            {buttonText}
          </Button>
          <WishlistButton />
        </Grid>
        <AddStackButton onAdded={onAdded} />
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
