import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

const ThirdPartScripts = () => {
  const [loaded, setLoaded] = useState(false)
  const pageFullyLoaded = () => {
    setLoaded(true)
  }

  useEffect(() => {
    window.addEventListener('load', pageFullyLoaded, false)
  }, [])

  if (!loaded) return <></>
  return (
    <Helmet>
      {process.env.GATSBY_TIDIO_KEY && (
        <script
          async
          key="gatsby-plugin-tidio"
          src={`//code.tidio.co/${process.env.GATSBY_TIDIO_KEY}.js`}
        />
      )}
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
              ttq.load('${process.env.GATSBY_TIKTOK_PIXEL_ID}');
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
    </Helmet>
  )
}

export default ThirdPartScripts
