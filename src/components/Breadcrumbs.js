import React from 'react'
import PropTypes from 'prop-types'
import { Box, Text, Link, Flex } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'

const Breadcrumbs = ({ links, currentPage, children }) => (
  <Flex
    py={3}
    px={4}
    sx={{
      borderBottom: '1px solid',
      borderColor: 'border',
      alignItems: 'center',
      height: 46,
    }}
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
)

const linkShape = PropTypes.shape({
  text: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
}).isRequired

Breadcrumbs.propTypes = {
  links: PropTypes.arrayOf(linkShape).isRequired,
  currentPage: linkShape,
}

export default Breadcrumbs
