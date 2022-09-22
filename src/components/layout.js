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
import { Flex } from 'theme-ui'
import loadable from '@loadable/component'
import Announcements from './Announcements'
import Header from './header'
import Footer from './footer'
import Drawers from './drawers'
import SEO from './seo'
import RecentlyViewedProductsProvider from '../contexts/RecentlyViewedProductsContext'

const ThirdPartyScripts = loadable(() => import('./ThirdPartyScripts'))
const TidioLink = loadable(() => import('./TidioLink'))

const Layout = ({ title, description, children }) => (
  <RecentlyViewedProductsProvider>
    <Drawers>
      <SEO title={title} description={description} />
      <Flex
        sx={{
          minHeight: '100vh',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        <Announcements />
        <Header />
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
}

export default Layout
