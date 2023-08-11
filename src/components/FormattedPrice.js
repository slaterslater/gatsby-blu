import PropTypes from 'prop-types'
import { useContext, useMemo } from 'react'
import { CurrencyContext } from '../contexts/CurrencyContext'

export const useFormattedPrice = ({ amount, currencyCode = 'CAD' }) => {
  const formatter = Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    style: 'currency',
    currency: currencyCode,
  })

  return useMemo(() => {
    if (!amount || !currencyCode) return null
    const formattedPrice = formatter.format(amount)
    if (formattedPrice.charAt(0) !== '$') return formattedPrice
    return `US${formattedPrice}`
  }, [amount, currencyCode, formatter])
}

const FormattedPrice = ({ priceV2 }) => {
  const { currencyCode } = useContext(CurrencyContext)
  const amount = priceV2.amount || priceV2
  return useFormattedPrice({ amount, currencyCode })
}

FormattedPrice.propTypes = {
  priceV2: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.shape({
      amount: PropTypes.string.isRequired,
      // currencyCode: PropTypes.string.isRequired,
    }),
  ]).isRequired,
}

export default FormattedPrice
