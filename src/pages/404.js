import React from 'react'

import { Container, Text, Heading, Button } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import Layout from '../components/layout'
import SEO from '../components/seo'

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <Container sx={{ textAlign: 'center' }}>
      <Heading as="h1" pb={4} pt={8}>
        404
      </Heading>
      <Text as="p" pb={6}>
        The page you are looking for cannot be found
      </Text>
      <Button as={GatsbyLink} to="/">
        Back to Homepage
      </Button>
    </Container>
  </Layout>
)

export default NotFoundPage
