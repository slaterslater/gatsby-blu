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
        {process.env.GATSBY_KLAVIYO_PUBLIC_KEY && (
          <script
            type="application/javascript"
            async
            src={`https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${process.env.GATSBY_KLAVIYO_PUBLIC_KEY}`}
          />
        )}
        {process.env.GATSBY_ADROLL_ADV_ID && process.env.GATSBY_ADROLL_PIX_ID && (
          <script type="text/javascript">
            {`
              adroll_adv_id = "${process.env.GATSBY_ADROLL_ADV_ID}";
              adroll_pix_id = "${process.env.GATSBY_ADROLL_PIX_ID}";
              adroll_version = "2.0";
              (function(w, d, e, o, a) {
                w.__adroll_loaded = true;
                w.adroll = w.adroll || [];
                w.adroll.f = [ 'setProperties', 'identify', 'track' ];
                var roundtripUrl = "https://s.adroll.com/j/" + adroll_adv_id
                    + "/roundtrip.js";
                for (a = 0; a < w.adroll.f.length; a++) {
                  w.adroll[w.adroll.f[a]] = w.adroll[w.adroll.f[a]] || (function(n) {
                    return function() {
                      w.adroll.push([ n, arguments ])
                    }
                  })(w.adroll.f[a])
                }
                e = d.createElement('script');
                o = d.getElementsByTagName('script')[0];
                e.async = 1;
                e.src = roundtripUrl;
                o.parentNode.insertBefore(e, o);
              })(window, document);
              adroll.track("pageView");
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
      <NewsletterSignUpPrompt />
    </Drawers>
  </RecentlyViewedProductsProvider>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
