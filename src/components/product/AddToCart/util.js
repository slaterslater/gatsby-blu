import { useMemo } from 'react'
import { DateTime } from 'luxon'

export const getPreorderMessage = tag => {
  if (tag.includes('pre-order')) {
    const [, isoDate] = tag.split(':')
    const preorderDate = DateTime.fromISO(isoDate)
    const now = DateTime.now()

    if (preorderDate < now) return null
    const format = 'MMM d'
    return `expected to ship week of ${preorderDate.toFormat(format)}`
  }
  return null
}

export const getTagAttributes = tags =>
  tags.reduce((acc, tag) => {
    if (tag.includes('made-to-order')) {
      return [
        ...acc,
        {
          key: 'made to order',
          value: 'allow 6-8 weeks production and delivery',
        },
      ]
    }

    if (tag.includes('pre-order')) {
      const message = getPreorderMessage(tag)
      if (!message) return acc

      return [
        ...acc,
        {
          key: 'pre-order',
          value: message,
        },
      ]
    }
    return acc
  }, [])

export const useProductPreorderMessage = tags =>
  useMemo(
    () =>
      tags.reduce((acc, tag) => {
        const message = getPreorderMessage(tag)
        return message || acc
      }, ''),
    [tags]
  )
