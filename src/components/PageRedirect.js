import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { navigate } from '@reach/router'

// nested product pages were a feature of shopify
// redirect to the root product page
const CollectionProductPage = ({ to }) => {
  useEffect(() => {
    navigate(to)
  }, [])

  return false
}

CollectionProductPage.propTypes = {
  to: PropTypes.string.isRequired,
}

export default CollectionProductPage
