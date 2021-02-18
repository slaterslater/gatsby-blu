import { Link as GatsbyLink } from 'gatsby'
import React from 'react'
import { Box, Flex, Text, Link, Grid } from 'theme-ui'
import CollectionProduct from '../components/CollectionProduct'
import CollectionProductGroup from '../components/CollectionProductGroup'

const CollectionPage = ({
  children,
  collectionTitle,
  productGroups,
  navigationLinks,
}) => {
  const totalProducts = 1
  // const totalProducts = productGroups.reduce(
  //   (acc, group) => [...acc, ...productGroups[group].nodes],
  //   []
  // ).length

  return (
    <Box
      sx={{
        display: ['block', 'grid'],
        gridTemplateColumns: ['1fr', 'max-content 1fr'],
        position: 'relative',
      }}
    >
      <Box as="aside" p={[0, 4]}>
        <Box
          sx={{
            position: 'sticky',
            top: 0,
          }}
        >
          <Flex
            flexDirection={['row', 'column']}
            p={3}
            as="nav"
            sx={{
              overflowX: 'auto',
              flexWrap: 'nowrap',
            }}
          >
            {navigationLinks.map(({ to, text }) => (
              <Link
                as={GatsbyLink}
                to={to}
                fontSize={[0, 1]}
                key={`${to}-${text}-sidebar`}
                py={1}
                pr={[3, 0]}
                flex="0 0 auto"
                sx={{
                  fontFamily: 'Montserrat, sans-serif',
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                {text}
              </Link>
            ))}
          </Flex>
        </Box>
      </Box>
      <Box as="main" p={[3, 4]}>
        <div>{children}</div>
        <Flex pb={4}>
          <Text as="h1" fontSize={4}>
            {collectionTitle}
          </Text>
          <Box>{totalProducts} products</Box>
        </Flex>
        <div>
          {productGroups.map(group => (
            <CollectionProductGroup
              groupType={group.fieldValue}
              key={group.fieldValue}
            >
              {group.nodes.map(product => (
                <CollectionProduct key={product.id} product={product} />
              ))}
            </CollectionProductGroup>
          ))}
        </div>
      </Box>
    </Box>
  )
}

export default CollectionPage
