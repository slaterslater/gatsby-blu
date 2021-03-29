import PropTypes from 'prop-types'
import { useFormattedPrice } from '../../hooks/utils'

const FormattedPrice = ({ priceV2: { amount, currencyCode } }) =>
  useFormattedPrice({ amount, currency: currencyCode })

FormattedPrice.propTypes = {
  priceV2: PropTypes.shape({
    amount: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
  }).isRequired,
}

export default FormattedPrice
