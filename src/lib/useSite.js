import { graphql, useStaticQuery } from 'gatsby'

export default function useSite() {
  const { site } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `)
  return { siteUrl: site.siteMetadata.siteUrl }
}
