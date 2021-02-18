import { useMemo } from 'react'

export const useProductTitle = title =>
  useMemo(() => title.split(' - ')[0], [title])
