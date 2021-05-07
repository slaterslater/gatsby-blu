import PropTypes from 'prop-types'
import { useMemo } from 'react'

export const useFormattedPrice = ({ amount, currencyCode = 'CAD' }) => {
  const formatter = Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    style: 'currency',
    currency: currencyCode,
  })

  return useMemo(() => {
    if (!amount || !currencyCode) return null

    return formatter.format(amount)
  }, [amount, currencyCode, formatter])
}

const FormattedPrice = ({ priceV2: { amount, currencyCode } }) =>
  useFormattedPrice({ amount, currencyCode })

FormattedPrice.propTypes = {
  priceV2: PropTypes.shape({
    amount: PropTypes.string.isRequired,
    currencyCode: PropTypes.string.isRequired,
  }).isRequired,
}

export default FormattedPrice
