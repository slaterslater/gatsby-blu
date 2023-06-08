import React, { useEffect, useState } from 'react'
import { Box, Heading, Text } from 'theme-ui'
import { BsCheckCircle } from 'react-icons/bs'
import Layout from '../components/layout'
import NewsletterSubscribe from '../components/NewsletterSubscribe'
import SmsSubscribe from '../components/SmsSubscribe'
import { CalloutBox } from '../components/product/ProductCTACallout'
import NewsletterAndSMS from '../components/form/NewsletterAndSMS'

const NewsletterPage = props => {
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!success) return
    setTimeout(() => {
      setSuccess(false)
      // }, 5000)
    }, 2800)
  }, [success])

  return (
    <Layout
      title="newsletter sign up"
      description="be the first to know when we launch new collections, new products, events, what we're musing over, and all the other magic we have planned!."
    >
      <Box
        as="main"
        sx={{ width: '100%', maxWidth: 480, h1: { fontSize: 5 } }}
        variant="sectionWrap"
        mx="auto"
      >
        <Heading as="h1" mb={5} sx={{ textAlign: 'center' }}>
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
        {/* <NewsletterSubscribe color="primary" />
      <SmsSubscribe color="primary" /> */}
        {success && (
          <CalloutBox
            icon={BsCheckCircle}
            title="you are signed up!"
            description={`\nyou'll be the first to know when we launch\n new collections,\n new products,\n events,\n what we're musing over,\n and all the other magic we have planned!`}
            bg="cream"
            sx={{ maxWidth: 380, p: { lineHeight: 2.5 } }}
            mx="auto"
            mt={7}
          />
        )}
        {!success && <NewsletterAndSMS onSuccess={() => setSuccess(true)} />}
      </Box>
    </Layout>
  )
}

export default NewsletterPage
