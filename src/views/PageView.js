import React from 'react'
import { Heading, Box, Container } from 'theme-ui'
import Layout from '../components/layout'
import { ShopifyHtml } from '../components/ShopifyHtml'
import NewsletterForm from '../components/NewsletterForm'
import Exchange from '../components/Exchange'
import ConsultationForm from '../components/BookConsultationForm'

const PageView = ({ title, summary, body, currentPath }) => (
  <Layout title={title} description={summary}>
    <Container as="main" pb={8} sx={{ maxWidth: 680 }}>
      <Box pt={7} pb={2}>
        <Heading>{title}</Heading>
      </Box>
      {currentPath?.includes('/pages/exchange-form') && (
        <Exchange variant="primary" />
      )}
      {currentPath?.includes('/pages/book-a-consultation') && (
        <ConsultationForm variant="primary" />
      )}
      <ShopifyHtml
        dangerouslySetInnerHTML={{
          __html: body,
        }}
      />
      {currentPath?.includes('/pages/sign-up') && (
        <NewsletterForm variant="primary" />
      )}
    </Container>
  </Layout>
)

export default PageView
