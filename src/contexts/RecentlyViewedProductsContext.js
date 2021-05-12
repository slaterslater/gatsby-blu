import React, { useMemo, createContext, useState, useEffect } from 'react'
import { useMatch } from '@reach/router'

export const RecentlyViewedProductsContext = createContext([])

const RecentlyViewedProductsProvider = props => {
  const [recentlyViewed, setRecentlyViewed] = useState('')
  const match = useMatch('/products/:handle')
  const { handle } = match || {}

  useEffect(() => {
    const recents = localStorage.getItem('recentlyViewed')
    if (recents) {
      setRecentlyViewed(recents)
    }
  }, [])

  useEffect(() => {
    if (handle) {
      setRecentlyViewed(prev => {
        const handles = prev.split(',')
        const nextHandles = [handle, ...handles]
        const nextRecents = Array.from(new Set(nextHandles))
          .slice(0, 4)
          .join(',')

        localStorage.setItem('recentlyViewed', nextRecents)
        return nextRecents
      })
    }
  }, [handle])

  const value = useMemo(() => recentlyViewed.split(','), [recentlyViewed])

  return <RecentlyViewedProductsContext.Provider value={value} {...props} />
}

export default RecentlyViewedProductsProvider
