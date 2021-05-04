import { useMemo } from 'react'

export const useFormattedPrice = ({ amount, currency = 'CAD' }) => {
  const formatter = Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    style: 'currency',
    currency,
  })

  return useMemo(() => {
    if (!amount || !currency) return undefined

    return formatter.format(amount)
  }, [amount, currency, formatter])
}
