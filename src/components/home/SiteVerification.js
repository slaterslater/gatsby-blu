import React from 'react'
import { Helmet } from 'react-helmet'

const SiteVerification = () => (
  <Helmet>
    <meta
      name="google-site-verification"
      content={process.env.GATSBY_GOOGLE_SITE_VERIFICATION_1}
    />
    <meta
      name="google-site-verification"
      content={process.env.GATSBY_GOOGLE_SITE_VERIFICATION_2}
    />
  </Helmet>
)

export default SiteVerification
