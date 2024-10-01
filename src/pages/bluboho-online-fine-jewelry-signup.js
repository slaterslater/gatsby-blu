import React, { useEffect, useState } from 'react'
import { Container, Heading, Text } from 'theme-ui'
import { FaRegKissWinkHeart } from 'react-icons/fa'
import CardSignupForm from '../components/form/CardSignupForm'
import Layout from '../components/layout'
import { CalloutBox } from '../components/product/ProductCTACallout'

const SignupPage = () => {
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!success) return
    setTimeout(() => {
      setSuccess(false)
    }, 5000)
    // }, 2800)
  }, [success])

  return (
    <Layout
      title="Sign up for a message from the Universe"
      description="Subscribe to bluboho fine jewelry online: Canada's best fine gold jewelry store and receive updates on new releases, events and jewelry styling tips. Sign up for complimentary Contemplation Cards to receive a message from the Universe"
    >
      <Container sx={{ minHeight: '82vh' }}>
        <Heading as="h1" sx={{ textAlign: 'center', fontSize: 5 }}>
          let's stay in touch
        </Heading>
        <Text
          as="p"
          variant="copy"
          sx={{ textAlign: 'center', maxWidth: 470, fontSize: 0 }}
          mx="auto"
          my={4}
        >
          subscribe to our email and sms and we'll send you a little something
          to welcome you to our family, and help you out with your first
          purchase from us!
        </Text>
        {success && (
          <CalloutBox
            icon={FaRegKissWinkHeart}
            title="request submitted!"
            description={`\nthank you for getting in touch!\nkeep your eyes open,\na message from the universe is on its way`}
            bg="cream"
            sx={{ maxWidth: 380 }}
            mx="auto"
            mt={7}
          />
        )}
        {!success && <CardSignupForm onSuccess={() => setSuccess(true)} />}
      </Container>
    </Layout>
  )
}

export default SignupPage
