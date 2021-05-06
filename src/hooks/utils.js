import { useMemo } from 'react'

export const useFormattedPrice = ({
  amount,
  currency = 'CAD',
  currencyCode = 'CAD',
}) => {
  const formatter = Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    style: 'currency',
    currency: currencyCode || currency,
  })

  return useMemo(() => {
    if (!amount || !(currency || currencyCode)) return undefined

    return formatter.format(amount)
  }, [amount, currency, currencyCode, formatter])
}
