import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import ProductSocial from './product/ProductSocial'

const FooterSocials = props => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  return (
    <ProductSocial
      description={site.siteMetadata.description}
      title={site.siteMetadata.title}
      showLabel={false}
    />
  )
}

export default FooterSocials
