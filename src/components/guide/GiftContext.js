import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

export const GiftContext = createContext(0)

export const useGiftContext = () => useContext(GiftContext)

const GiftProvider = ({ index, ...props }) => {
  const [collectionIndex, setCollectionIndex] = useState(index)
  return <GiftContext.Provider value={{ collectionIndex }} {...props} />
}

export default GiftProvider

GiftProvider.propTypes = {
  index: PropTypes.number,
}
