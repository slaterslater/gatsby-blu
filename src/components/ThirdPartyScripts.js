import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

const ThirdPartScripts = () => {
  const [loaded, setLoaded] = useState(false)
  // const pageFullyLoaded = () => {
  //   setLoaded(true)
  // }

  // useEffect(() => {
  //   window.addEventListener('load', pageFullyLoaded, false)
  // }, [])

  // if (!loaded) return <></>
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
      {process.env.GATSBY_HOTJAR_TRACKING_ID && (
        <script>
          {`
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:${process.env.GATSBY_HOTJAR_TRACKING_ID},hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </script>
      )}
      {/* {process.env.GATSBY_YOTPO_APP_KEY && (
        <script type="text/javascript">
          {`
            (function e(){var e=document.createElement("script");e.type="text/javascript",e.async=true,e.src="//staticw2.yotpo.com/${process.env.GATSBY_YOTPO_APP_KEY}/widget.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)})();
          `}
        </script>
      )} */}
      {process.env.GATSBY_BING_TAG_ID && (
        <script>{`(function(w,d,t,r,u){var f,n,i;w[u]=w[u]||[],f=function(){var o={ti:"${process.env.GATSBY_BING_TAG_ID}", tm:"shpfy_ui"};o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")},n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)},i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)})(window,document,"script","//bat.bing.com/bat.js","uetq");`}</script>
      )}
      {process.env.GATSBY_ADROLL_ADV_ID && process.env.GATSBY_ADROLL_PIX_ID && (
        <script type="text/javascript">
          {`
            adroll_adv_id = ${process.env.GATSBY_ADROLL_ADV_ID};
            adroll_pix_id = ${process.env.GATSBY_ADROLL_PIX_ID};
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
    </Helmet>
  )
}

export default ThirdPartScripts
