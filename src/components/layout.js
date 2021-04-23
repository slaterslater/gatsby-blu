/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

// import 'photoswipe/dist/photoswipe.css'
// import 'photoswipe/dist/default-skin/default-skin.css'
import '@reach/dialog/styles.css'

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { Flex } from 'theme-ui'
import Announcements from './Announcements'

import Header from './header'
import Footer from './footer'
import Drawers from './drawers'
import SEO from './seo'

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
    <Drawers>
      <SEO />
      <Flex
        sx={{
          minHeight: '100vh',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        <Announcements />
        <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
        {children}
        <Footer />
      </Flex>
    </Drawers>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
