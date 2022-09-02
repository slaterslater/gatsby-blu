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
import '@reach/menu-button/styles.css'

import React from 'react'
import PropTypes from 'prop-types'
import { Flex } from 'theme-ui'
import Announcements from './Announcements'

import Header from './header'
import Footer from './footer'
import Drawers from './drawers'
import SEO from './seo'
import RecentlyViewedProductsProvider from '../contexts/RecentlyViewedProductsContext'
// import NewsletterSignUpPrompt from './NewsletterSignUpPrompt'
import TidioLink from './TidioLink'

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
        {process.env.GATSBY_PINTEREST_BASE_CODE && (
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
        )}
        {process.env.GATSBY_TIKTOK_PIXEL_ID && (
          <script type="text/javascript">
            {`
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
                ttq.load(${process.env.GATSBY_TIKTOK_PIXEL_ID});
                ttq.page();
              }(window, document, 'ttq');
            `}
          </script>
        )}
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
      <TidioLink />
      {/* <NewsletterSignUpPrompt /> */}
    </Drawers>
  </RecentlyViewedProductsProvider>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
