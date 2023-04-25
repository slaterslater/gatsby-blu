import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import SEO from './seo'

const PageRedirect = ({ to, pageContext }) => {
  const path = to || pageContext.to || '/'

  useEffect(() => {
    navigate(path)
  }, [path])

  return <SEO title={pageContext.from || ''} />
}

PageRedirect.propTypes = {
  to: PropTypes.string.isRequired,
}

export default PageRedirect
