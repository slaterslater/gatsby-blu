import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

const defaultValues = {
  collectionIndex: 0,
}

export const GiftContext = createContext(defaultValues)

export const useGiftContext = () => useContext(GiftContext)

const GiftProvider = ({ index, ...props }) => {
  const [collectionIndex, setCollectionIndex] = useState(
    index || defaultValues.collectionIndex
  )
  return (
    <GiftContext.Provider
      value={{ ...defaultValues, collectionIndex }}
      {...props}
    />
  )
}

export default GiftProvider

GiftProvider.propTypes = {
  index: PropTypes.number,
}
