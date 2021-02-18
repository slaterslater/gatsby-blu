import { useMemo } from 'react'

export const useFormattedPrice = ({ amount, currency }) => {
  const formatter = Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    style: 'currency',
    currency,
  })

  return useMemo(() => formatter.format(amount), [amount, formatter])
}
