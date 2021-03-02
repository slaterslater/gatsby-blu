import { graphql, Link as GatsbyLink, useStaticQuery } from 'gatsby'
import { Flex, Text } from 'theme-ui'
import React from 'react'
import PropTypes from 'prop-types'

const NavigationLink = ({ to, children }) => (
  <Text
    as={GatsbyLink}
    to={to}
    variant="caps"
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
  </Text>
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
      <NavigationLink to="/shop/new-arrivals">New Arrivals</NavigationLink>
      <NavigationLink to="/shop/best-sellers">Best Sellers</NavigationLink>
      {data.allProductTypeNavigationJson.nodes.map(({ path, text }) => (
        <NavigationLink to={path} key={`${text}-sidebar`}>
          {text}
        </NavigationLink>
      ))}
    </Flex>
  )
}

export default CollectionSidebar
