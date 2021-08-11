import { LayoutGroupContext } from 'framer-motion'
import React from 'react'
import { Box, Heading } from 'theme-ui'
import NewsletterForm from '../components/NewsletterForm'
import Layout from '../components/layout'

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
      <Heading>Sign up for the newsletter</Heading>
      <NewsletterForm variant="primary" />
    </Box>
  </Layout>
)

export default NewsletterPage
