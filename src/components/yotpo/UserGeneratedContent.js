import React from 'react'
import { Helmet } from 'react-helmet'
import { Box } from 'theme-ui'
import { Script } from 'gatsby'

const UserGeneratedContent = () => {
  if (!process.env.GATSBY_YOTPO_APP_KEY) return null
  return (
    <>
      {/* <Helmet>
        <script type="text/javascript" defer>
          {`(function e(){var e=document.createElement("script");e.type="text/javascript",e.async=true,e.src="//staticw2.yotpo.com/${process.env.GATSBY_YOTPO_APP_KEY}/widget.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)})();`}
        </script>
      </Helmet> */}
      <Script>
        {`(function e(){var e=document.createElement("script");e.type="text/javascript",e.async=true,e.src="//staticw2.yotpo.com/${process.env.GATSBY_YOTPO_APP_KEY}/widget.js";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)})();`}
      </Script>
      <Box
        className="yotpo yotpo-pictures-widget"
        data-gallery-id="63e679d8cacd742a31fcd561"
        sx={{
          marginBottom: '35px !important',
          '.yotpo-slider-title': { display: 'none' },
        }}
      />
    </>
  )
}

export default UserGeneratedContent
