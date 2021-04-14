import { graphql, Link as GatsbyLink, useStaticQuery } from 'gatsby'
import { Box, Flex, Text, Link, Divider } from 'theme-ui'
import React from 'react'
import PropTypes from 'prop-types'

const NavigationLink = ({ to, children }) => (
  <Link
    as={GatsbyLink}
    to={to}
    variant="nav"
    key={`${to}-${children}-sidebar`}
    py={1}
    pr={[3, 0]}
    sx={{
      fontSize: [0, 1],
      flex: '0 0 auto',
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </Link>
)
NavigationLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
}

const CollectionSidebar = () => {
  const data = useStaticQuery(graphql`
    query {
      allProductTypeNavigationJson {
        nodes {
          path
          text
        }
      }
    }
  `)

  return (
    <Flex
      p={3}
      as="nav"
      sx={{
        flexDirection: ['row', 'column'],
        overflowX: 'auto',
        flexWrap: 'nowrap',
      }}
    >
      <NavigationLink to="/collections/newarrivals">
        New Arrivals
      </NavigationLink>
      <NavigationLink to="/collections/best-sellers">
        Best Sellers
      </NavigationLink>

      <Divider />
      {data.allProductTypeNavigationJson.nodes.map(({ path, text }) => (
        <NavigationLink to={path} key={`${text}-sidebar`}>
          {text}
        </NavigationLink>
      ))}
    </Flex>
  )
}

export default CollectionSidebar
