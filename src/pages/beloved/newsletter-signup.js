import React, { useState, useEffect } from 'react'
import { Container, Heading, Text } from 'theme-ui'
import { GiBigDiamondRing } from 'react-icons/gi'
import Layout from '../../components/layout'
import { CalloutBox } from '../../components/product/ProductCTACallout'
import BelovedSignupForm from '../../components/form/BelovedSignupForm'

const BelovedNewsletterSignupPage = () => {
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!success) return
    setTimeout(() => {
      setSuccess(false)
    }, 5000)
  }, [success])

  const title = 'sign up for the beloved newsletter'
  const description =
    'handcrafted in toronto. ethically sourced. sign up today for the latest ooak sapphire ring launches, updates, and collection launches.'

  return (
    <Layout title={title} description={description} isBeloved>
      <Container>
        <Heading as="h1" variant="h2" sx={{ textAlign: 'center' }} pt={[5, 1]}>
          {title}
        </Heading>
        {success && (
          <CalloutBox
            icon={GiBigDiamondRing}
            title="you are signed up!"
            description="check your email for the latest ooak sapphire ring launches, updates, and collection launches."
            bg="cream"
            sx={{ maxWidth: 380, margin: '0 auto' }}
            py={6}
          />
        )}
        {!success && (
          <>
            <Text
              as="p"
              variant="copy"
              sx={{ textAlign: 'center', maxWidth: 420 }}
              pt={6}
              mx="auto"
            >
              {description}
            </Text>
            <BelovedSignupForm onSuccess={() => setSuccess(true)} />
          </>
        )}
      </Container>
    </Layout>
  )
}

export default BelovedNewsletterSignupPage
