import { Container, Box, Heading } from 'theme-ui'
import { graphql } from 'gatsby'
import React from 'react'
import Layout from '../components/layout'
import { ShopifyHtml } from '../components/ShopifyHtml'
import BookConsultationForm from '../components/BookConsultationForm'

const BookAConsultation = ({ data }) => (
  <Layout
    title="Book a Consultation Appointment"
    description="Let us work with you throughout your engagement ring consultation on finding your beloved by bluboho engagement ring or wedding band"
  >
    <Container as="main" sx={{ maxWidth: 680 }}>
      <Box pt={7} pb={5}>
        <Heading>{data.shopifyPage.title}</Heading>
      </Box>
      <BookConsultationForm />
      <ShopifyHtml
        dangerouslySetInnerHTML={{
          __html: data.shopifyPage.body,
        }}
      />
    </Container>
  </Layout>
)

export default BookAConsultation

export const query = graphql`
  query BookConsultationPage {
    shopifyPage(handle: { eq: "book-a-consultation" }) {
      title
      body
    }
  }
`
