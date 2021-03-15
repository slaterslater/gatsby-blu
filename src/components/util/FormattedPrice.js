import PropTypes from 'prop-types'
import { useFormattedPrice } from '../../hooks/utils'

const FormattedPrice = ({ amount, currency }) =>
  useFormattedPrice({ amount, currency })

FormattedPrice.propTypes = {
  amount: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
}

export default FormattedPrice
