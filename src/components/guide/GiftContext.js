import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

const defaultValues = {
  collectionIndex: 0,
  // boxIndex: 0,
  // setCollectionIndex: () => {},
  // setBoxIndex: () => {},
}

export const GiftContext = createContext(defaultValues)

export const useGiftContext = () => useContext(GiftContext)

const GiftProvider = ({ index, ...props }) => {
  const [collectionIndex, setCollectionIndex] = useState(index)
  // const [boxIndex, setBoxIndex] = useState(0)
  return (
    <GiftContext.Provider
      value={{ ...defaultValues, collectionIndex }}
      // value={{ ...defaultValues, collectionIndex, boxIndex, setBoxIndex }}
      {...props}
    />
  )
}

export default GiftProvider

GiftProvider.propTypes = {
  index: PropTypes.number,
}
