import React from 'react'
import { DateTime } from 'luxon'

const useFormattedDate = (iso, format = '') => {
  if (format) {
    return DateTime.fromISO(iso).toLocaleString(DateTime[format])
  }
  return DateTime.fromISO(iso).toLocaleString(DateTime.DATE_SHORT)
}

const FormattedDate = ({ iso, format }) => {
  const date = useFormattedDate(iso, format)
  return date
}

export default FormattedDate
