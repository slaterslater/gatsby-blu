import React from 'react'
import { graphql } from 'gatsby'
import { Heading, Box, Container } from 'theme-ui'
import Layout from '../../components/layout'
import ShopifyHtml from '../../components/ShopifyHtml'
import SEO from '../../components/seo'
import NewsletterForm from '../../components/NewsletterForm'
import Exchange from '../../components/Exchange'
import ConsultationForm from '../../components/BookConsultationForm'

const PageTemplate = ({ data, path }) => (
  <Layout>
    <SEO title={data.shopifyPage.title} />
    <Container as="main" pb={8} sx={{ maxWidth: 680 }}>
      <Box pt={7} pb={2}>
        <Heading>{data.shopifyPage.title}</Heading>
      </Box>
      {path?.includes('/pages/exchange-form') && <Exchange variant="primary" />}
      {path?.includes('/pages/book-a-consultation') && (
        <ConsultationForm variant="primary" />
      )}
      <ShopifyHtml
        dangerouslySetInnerHTML={{
          __html: data.shopifyPage.body,
        }}
      />
      {path?.includes('/pages/sign-up') && <NewsletterForm variant="primary" />}
    </Container>
  </Layout>
)

export default PageTemplate

export const query = graphql`
  query Page($handle: String!) {
    shopifyPage(handle: { eq: $handle }) {
      title
      body
      handle
    }
  }
`
