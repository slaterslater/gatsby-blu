import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

const defaultValues = {
  collectionIndex: 0,
  setCollectionIndex: () => {},
}

export const GiftContext = createContext(defaultValues)

export const useGiftContext = () => useContext(GiftContext)

const GiftProvider = ({ children }) => {
  const [collectionIndex, setCollectionIndex] = useState(0)
  return (
    <GiftContext.Provider
      value={{
        ...defaultValues,
        collectionIndex,
        setCollectionIndex,
      }}
    >
      {children}
    </GiftContext.Provider>
  )
}

export default GiftProvider

GiftProvider.propTypes = {
  children: PropTypes.any,
}
