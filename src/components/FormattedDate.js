import React from 'react'
import { DateTime } from 'luxon'

const useFormattedDate = iso =>
  DateTime.fromISO(iso).toLocaleString(DateTime.DATE_SHORT)

const FormattedDate = ({ iso }) => {
  const date = useFormattedDate(iso)
  return date
}

export default FormattedDate
