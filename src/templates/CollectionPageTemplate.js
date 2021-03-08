import React from 'react'
import { graphql } from 'gatsby'
import { Box, Divider, Flex, Heading, Text } from 'theme-ui'
import pluralize from 'pluralize'
import Layout from '../components/layout'
import ProductGrid from '../components/collection/CollectionProductGrid'

const CollectionPageTemplate = ({ data }) => {
  const { products, title, description } = data.shopifyCollection

  return (
    <Layout>
      <Box variant="sectionWrap" mx="auto" p={6} sx={{ maxWidth: 1444 }}>
        <Flex sx={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Box>
            <Heading as="h1">{title}</Heading>
            {description && <Text>{description}</Text>}
          </Box>
          <Box>
            <Text variant="caps">
              {pluralize('Products', products?.length || 0, true)}
            </Text>
          </Box>
        </Flex>
        <Divider my={3} />
        <ProductGrid products={products} />
      </Box>
    </Layout>
  )
}

export default CollectionPageTemplate

export const query = graphql`
  query CollectionPage($handle: String!) {
    shopifyCollection(handle: { eq: $handle }) {
      title
      description
      products {
        handle
        title
        images {
          originalSrc
          altText
        }
        priceRange {
          minVariantPrice {
            currencyCode
            amount
          }
          maxVariantPrice {
            currencyCode
            amount
          }
        }
      }
    }
  }
`
