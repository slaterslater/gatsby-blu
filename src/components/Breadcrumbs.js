import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text, Link, Flex } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { useLocation } from '@reach/router'
import SEO from './seo'

const Breadcrumbs = ({ links, currentPage, children, ...props }) => {
  const location = useLocation()
  const breadcrumbLdJSON = `

  {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [${links
      .map(
        (link, i) => `
    {
        "@type": "ListItem",
        "position": "${i + 1}",
        "name": "${link.text}",
        "item": "${location.origin}${link.path}"
    }
    `
      )
      .toString()},{
            "@type": "ListItem",
            "position": "${links.length + 1}",
            "name": "Necklaces",
            "item": "${location.href}"
          }]
    }
`
  return (
    <>
      <SEO>
        <script type="application/ld+json">{breadcrumbLdJSON}</script>
      </SEO>
      <Flex
        py={3}
        px={4}
        sx={{
          alignItems: 'center',
          overflowX: 'auto',
        }}
        {...props}
      >
        {links?.map(({ path, text }) => (
          <React.Fragment key={`breadcrumb-${path}-${text}`}>
            <Text variant="caps">
              <Link variant="nav" as={GatsbyLink} to={path}>
                {text}
              </Link>
            </Text>
            <Box px={2}>
              <Text>&bull;</Text>
            </Box>
          </React.Fragment>
        ))}
        <Text variant="caps">{currentPage.text}</Text>
        {children && <Box ml="auto">{children}</Box>}
      </Flex>
    </>
  )
}

const linkShape = PropTypes.shape({
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
}).isRequired

Breadcrumbs.propTypes = {
  links: PropTypes.arrayOf(linkShape).isRequired,
  currentPage: linkShape,
}

export default Breadcrumbs
