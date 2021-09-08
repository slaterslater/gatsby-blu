import React from 'react'
import PropTypes from 'prop-types'
import PageRedirect from '../../../../components/PageRedirect'

// nested product pages were a feature of shopify
// redirect to the root product page
const CollectionProductPage = ({ params: { handle } }) => (
  <PageRedirect to={`/products/${handle}`} />
)

CollectionProductPage.propTypes = {
  params: PropTypes.shape({
    handle: PropTypes.string.isRequired,
  }).isRequired,
}

export default CollectionProductPage
