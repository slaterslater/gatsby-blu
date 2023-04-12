import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text, Flex } from 'theme-ui'
import { Helmet } from 'react-helmet'
import { VscTriangleRight } from 'react-icons/vsc'
import ThemeLink from './app/ThemeLink'
import useSite from '../lib/useSite'
import { usePageContext } from '../contexts/PageContext'

export const Breadcrumbs = ({ links, currentPage, children, ...props }) => {
  const { siteUrl } = useSite()
  const { isBeloved } = usePageContext()

  const home = isBeloved
    ? { path: '/beloved', text: 'beloved by bluboho' }
    : { path: '/', text: 'home' }

  // make new array from home and links
  // refactor any component that calls Breadcrumbs to remove the home obj

  const breadcrumbLdJSON = `
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [${links
      .map(
        (link, i) => `
    {
        "@type": "ListItem",
        "position": "${i + 1}",
        "name": "${link.text}",
        "item": "${siteUrl}${link.path}"
    }
    `
      )
      .toString()}]
    }
`
  /*
,{
            "@type": "ListItem",
            "position": "${links.length + 1}",
            "name": "Necklaces",
            "item": "${siteUrl}${currentPage.path}"
          }
*/

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{breadcrumbLdJSON}</script>
      </Helmet>
      <Flex
        py={[4, 5]}
        mr={-5}
        sx={{
          alignItems: 'center',
          overflowX: 'auto',
          webkitOverflowScrolling: 'touch',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
        {...props}
      >
        {links?.map(({ path, text }) => (
          <React.Fragment key={`breadcrumb-${path}-${text}`}>
            <Text
              variant="caps"
              sx={{ flexShrink: 0, scrollSnapAlign: 'start', fontSize: 9 }}
            >
              <ThemeLink variant="nav" to={path}>
                {text}
              </ThemeLink>
            </Text>
            <Box px={2} sx={{ flexShrink: 0 }}>
              <Text as={VscTriangleRight} size={10} sx={{ color: '#C4C4C4' }} />
            </Box>
          </React.Fragment>
        ))}
        <Text
          variant="caps"
          sx={{ fontSize: 9, flexShrink: 0, scrollSnapAlign: 'start' }}
        >
          {currentPage.text}
        </Text>
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
