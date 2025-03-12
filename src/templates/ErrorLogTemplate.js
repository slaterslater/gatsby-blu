import React, { useEffect } from 'react'
import { Container, Text } from 'theme-ui'
import Layout from '../components/layout'

const ErrorLogTemplate = ({ pageContext }) => {
  const { errors } = pageContext

  useEffect(()=> {
    console.log({errors })
  }, [])

  return (
    <Layout>
      <Container>
        <Text as="p">check console</Text>
      </Container>
    </Layout>
  )
}

export default ErrorLogTemplate

