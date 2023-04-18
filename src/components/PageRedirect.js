import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'

const PageRedirect = ({ to, pageContext }) => {
  const path = to || pageContext.to || '/'

  useEffect(() => {
    navigate(path)
  }, [path])

  return false
}

PageRedirect.propTypes = {
  to: PropTypes.string.isRequired,
}

export default PageRedirect
