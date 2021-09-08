import React from 'react'
import PropTypes from 'prop-types'
import PageRedirect from '../../../components/PageRedirect'

const BlogsNewsPage = ({ params: { handle } }) => (
  <PageRedirect to={`/blog/${handle}`} />
)

BlogsNewsPage.propTypes = {
  params: PropTypes.shape({
    handle: PropTypes.string.isRequired,
  }).isRequired,
}

export default BlogsNewsPage
