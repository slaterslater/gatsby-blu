import { LayoutGroupContext } from 'framer-motion'
import React from 'react'
import { Box, Heading } from 'theme-ui'
import NewsletterForm from '../components/NewsletterForm'
import Layout from '../components/layout'

const NewsletterPage = props => (
  <Layout title="newsletter sign up">
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
