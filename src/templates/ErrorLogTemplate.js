import React from 'react'
import { Container, Text } from 'theme-ui'
import Layout from '../components/layout'

const ErrorLogTemplate = ({ pageContext }) => {
  const { errors } = pageContext

  console.log({errors })

  return (
    <Layout>
      <Container>
        <Text as="p">check logs</Text>
      </Container>
    </Layout>
  )
}

export default ErrorLogTemplate

