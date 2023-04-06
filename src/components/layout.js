/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import '@reach/dialog/styles.css'
import 'tippy.js/dist/tippy.css'
import '@reach/menu-button/styles.css'

import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex } from 'theme-ui'
import loadable from '@loadable/component'
import Announcements from './Announcements'
import Header from './header'
import Footer from './footer'
import SEO from './seo'
import RecentlyViewedProductsProvider from '../contexts/RecentlyViewedProductsContext'
import Drawers from './drawers'
import Countdown from './Countdown'

const ThirdPartyScripts = loadable(() => import('./ThirdPartyScripts'))
const TidioLink = loadable(() => import('./TidioLink'))

const Layout = ({ title, description, children, isBeloved = false }) => (
  <RecentlyViewedProductsProvider>
    <Drawers>
      <SEO title={title} description={description} />
      <Flex
        sx={{
          minHeight: '100vh',
          minWidth: 380,
          flexDirection: 'column',
          alignItems: 'stretch',
          overflow: 'hidden',
          background: isBeloved ? 'url("/beloved-bg.webp")' : null,
          backgroundSize: '100%',
        }}
      >
        <Announcements />
        <Header />
        <Countdown />
        {children}
        <Footer />
      </Flex>
      <TidioLink />
    </Drawers>
    <ThirdPartyScripts />
  </RecentlyViewedProductsProvider>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  isBeloved: PropTypes.bool,
}

export default Layout
