import { LayoutGroupContext } from 'framer-motion'
import React from 'react'
import { Box, Heading } from 'theme-ui'
import NewsletterForm from '../components/NewsletterForm'
import Layout from '../components/layout'

const NewsletterPage = props => (
  <Layout>
    <Box as="main" sx={{ maxWidth: 600 }} variant="sectionWrap" mx="auto">
      <Heading>Sign up for the newsletter</Heading>
      <NewsletterForm variant={null} />
    </Box>
  </Layout>
)

export default NewsletterPage
