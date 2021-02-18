/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { Styled } from 'theme-ui'
import Announcements from './Announcements'

import Header from './header'

const announcements = [
  { text: 'Book a Virtual Appointment', to: '/book-an-appointment' },
  { text: 'Limited Time Free Shipping in Canada', to: '/shipping' },
]

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Styled.root>
        <Announcements announcements={announcements} />
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      </Styled.root>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
