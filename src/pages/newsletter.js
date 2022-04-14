import React from 'react'
import { Box, Heading } from 'theme-ui'
import Layout from '../components/layout'
import { FooterNewsletterSubscribe } from '../components/footer/sections'

const NewsletterPage = props => (
  <Layout
    title="newsletter sign up"
    description="be the first to know when we launch new collections, new products, events, what we’re musing over, and all the other magic we have planned! We love..."
  >
    <Box
      as="main"
      sx={{ width: '100%', maxWidth: 480 }}
      variant="sectionWrap"
      mx="auto"
    >
      <Heading mb={5}>Sign up for the newsletter</Heading>
      <FooterNewsletterSubscribe color="primary" />
    </Box>
  </Layout>
)

export default NewsletterPage
