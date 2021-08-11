/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

// import 'photoswipe/dist/photoswipe.css'
// import 'photoswipe/dist/default-skin/default-skin.css'
import '@reach/dialog/styles.css'
import 'tippy.js/dist/tippy.css'

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { Flex } from 'theme-ui'
import Announcements from './Announcements'

import Header from './header'
import Footer from './footer'
import Drawers from './drawers'
import SEO from './seo'
import RecentlyViewedProductsProvider from '../contexts/RecentlyViewedProductsContext'
import NewsletterSignUpPrompt from './NewsletterSignUpPrompt'

const orgLdJSON = `
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "bluboho",
        "url": "https://www.bluboho.com",
        "description": "tell your story with our handcrafted jewelry. raw and refined pieces to mark every moment. international shipping. free shipping within Canada and the US. gift cards available.",
        "logo": "https://cdn.shopify.com/s/files/1/0685/0359/t/32/assets/bluboho-logo-vector-black.svg?v=4731259283198669391",
        "image": "https://cdn.shopify.com/s/files/1/0685/0359/t/32/assets/bluboho-logo-vector-black.svg?v=4731259283198669391",
        "sameAs": ["https://www.facebook.com/blubohojewelry","https://www.instagram.com/bluboho/","https://www.pinterest.ca/bluboho/"],
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "181 carlaw avenue, 303",
            "addressLocality": "toronto",
            "addressRegion": "Ontario",
            "postalCode": "M4M 2S1",
            "addressCountry": "Canada"
        },
        "founder": [
          {
            "@type": "Person",
            "name":"Maggie Aurocco",
            "knowsAbout":"Dainty Jewelry"
          },
          {
            "@type": "Person",
            "name":"Cheryl Labbett",
            "knowsAbout":"Designer Jewelry"
          }
        ],
        "telephone": "6472736297"
    }
`

const Layout = ({ title, description, children }) => (
  <RecentlyViewedProductsProvider>
    <Drawers>
      <SEO title={title} description={description}>
        <script type="application/ld+json">{orgLdJSON}</script>
        <script type="text/javascript">
          {`
               !function(e){if(!window.pintrk){window.pintrk=function(){window.pintrk.queue.push(
                 Array.prototype.slice.call(arguments))};var
                 n=window.pintrk;n.queue=[],n.version="3.0";var
                 t=document.createElement("script");t.async=!0,t.src=e;var
                 r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
               pintrk('load', ${process.env.GATSBY_PINTEREST_BASE_CODE});
               pintrk('page');
            `}
        </script>
        <noscript>
          {`
            <img
              height="1"
              width="1"
              style="display:none;"
              alt=""
              src="https://ct.pinterest.com/v3/?tid=${process.env.GATSBY_PINTEREST_BASE_CODE}&event=init&noscript=1"
            />

            `}
        </noscript>
      </SEO>
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
      <NewsletterSignUpPrompt />
    </Drawers>
  </RecentlyViewedProductsProvider>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
