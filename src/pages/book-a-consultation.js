import { Container, Box, Heading, Alert } from 'theme-ui'
import { graphql } from 'gatsby'
import React, { useState } from 'react'
import Layout from '../components/layout'
import ShopifyHtml from '../components/ShopifyHtml'
import BookConsultationForm from '../components/BookConsultationForm'
import SEO from '../components/seo'

const BookAConsultation = ({ data }) => {
  const [alert, setAlert] = useState({ type: null, message: null })
  return (
    <Layout>
      <SEO title="Book a Consultation Appointment" />
      <Container as="main" sx={{ maxWidth: 680 }}>
        <Box pt={7} pb={5}>
          <Heading>{data.shopifyPage.title}</Heading>
        </Box>
        {alert.message && <Alert variant={alert.type}>{alert.message}</Alert>}
        <BookConsultationForm
          onSuccess={() => {
            setAlert({ type: 'success', message: 'success!' })
          }}
          onError={() => {
            setAlert({ type: 'error', message: 'error!' })
          }}
        />
        <ShopifyHtml
          dangerouslySetInnerHTML={{
            __html: data.shopifyPage.body,
          }}
        />
      </Container>
    </Layout>
  )
}

export default BookAConsultation

export const query = graphql`
  query BookConsultationPage {
    shopifyPage(handle: { eq: "book-a-consultation" }) {
      title
      body
    }
  }
`
