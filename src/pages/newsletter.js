import React from 'react'
import { Box, Heading, Text } from 'theme-ui'
import Layout from '../components/layout'
import NewsletterSubscribe from '../components/NewsletterSubscribe'
import SmsSubscribe from '../components/SmsSubscribe'

const NewsletterPage = props => (
  <Layout
    title="newsletter sign up"
    description="be the first to know when we launch new collections, new products, events, what we're musing over, and all the other magic we have planned! We love..."
  >
    <Box
      as="main"
      sx={{ width: '100%', maxWidth: 480, h1: { fontSize: 5 } }}
      variant="sectionWrap"
      mx="auto"
    >
      <Heading as="h1" mb={5}>
        sign up for the newsletter
      </Heading>
      <Text
        variant="copy"
        as="p"
        sx={{
          fontSize: 0,
          color: 'primary',
        }}
        pb={4}
      >
        designed in canada. ethically sourced. sign up today for the latest
        news, updates, and collection launches.
      </Text>
      <NewsletterSubscribe color="primary" />
      <SmsSubscribe color="primary" />
    </Box>
  </Layout>
)

export default NewsletterPage
