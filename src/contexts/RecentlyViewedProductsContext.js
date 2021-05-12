import React, { createContext, useState, useEffect } from 'react'
import { useMatch } from '@reach/router'

const RecentlyViewedProductsContext = createContext()

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
      console.log(recentlyViewed)
      const prev = recentlyViewed.split(',').filter(item => !!item)
      console.log(prev)
      const nextRecents = Array.from(new Set([handle, ...prev]))
        .slice(0, 3)
        .join(',')
      setRecentlyViewed(nextRecents)
      localStorage.setItem('recentlyViewed', nextRecents)
    }
  }, [handle, recentlyViewed])

  return (
    <RecentlyViewedProductsContext.Provider
      value={recentlyViewed.split(',')}
      {...props}
    />
  )
}

export default RecentlyViewedProductsProvider
