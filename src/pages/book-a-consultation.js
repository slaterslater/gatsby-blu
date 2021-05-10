import { Container, Box, Heading } from 'theme-ui'
import { graphql } from 'gatsby'
import React, { useState } from 'react'
import { BiHeart } from 'react-icons/bi'
import Layout from '../components/layout'
import ShopifyHtml from '../components/ShopifyHtml'
import BookConsultationForm from '../components/BookConsultationForm'
import SEO from '../components/seo'
import { CalloutBox } from '../components/product/ProductCTACallout'

const BookAConsultation = ({ data }) => {
  const [alert, setAlert] = useState({ type: null })
  return (
    <Layout>
      <SEO title="Book a Consultation Appointment" />
      <Container as="main" sx={{ maxWidth: 680 }}>
        <Box pt={7} pb={5}>
          <Heading>{data.shopifyPage.title}</Heading>
        </Box>
        {alert.type === 'success' && (
          <Box pb={6}>
            <CalloutBox
              icon={BiHeart}
              title="Your request was received!"
              description="We will reach out shortly to confirm a time"
              bg="cream"
            />
          </Box>
        )}
        <BookConsultationForm
          onSuccess={() => {
            setAlert({ type: 'success' })
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
