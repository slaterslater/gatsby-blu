import React from 'react'
import { Box, Container, Heading, Text } from 'theme-ui'
import Layout from '../components/layout'
import NewsletterSubscribe from '../components/NewsletterSubscribe'
import SmsSubscribe from '../components/SmsSubscribe'

const LookingForUsPage = () => (
  <Layout
    title="looking for us on instagram and facebook?"
    description="let's stay in touch"
  >
    <Container>
      <Heading as="h1" sx={{ textAlign: 'center', fontSize: 5 }}>
        looking for us on instagram and facebook?
      </Heading>
      <Text as="p" sx={{ textAlign: 'center' }} my={5}>
        sorry! they were mistakenly deactivated.
        <br /> we are working to restore them,
        <br /> but in the meantime let's stay in touch:
        <br />
      </Text>
      <Box sx={{ maxWidth: 480 }} mx="auto">
        <NewsletterSubscribe color="primary" />
        <SmsSubscribe color="primary" />
      </Box>
    </Container>
  </Layout>
)

export default LookingForUsPage
