import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { Box, Heading, Text, Link } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import SmsSignUp from './SmsForm'

const SmsSubscribe = ({ color = 'white' }) => {
  const [success, setSuccess] = useState(false)
  const Motion = motion.create(Box)
  useEffect(() => {
    if (success)
      setTimeout(() => {
        setSuccess(false)
      }, 8000)
  }, [success])
  return (
    <AnimatePresence>
      <Motion
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: 'easeInOut', duration: 0.3 }}
        key="newsletter-signup-form"
      >
        {success ? (
          <>
            <Heading
              variant="caps"
              as="h6"
              sx={{ color, whiteSpace: 'nowrap' }}
              py={3}
              // add star * to text
            >
              thanks for subscribing to bluboho
            </Heading>
            <Text
              variant="copy"
              // pt={3}
              sx={{
                fontSize: 0,
                color,
                fontFamily: 'body',
                display: 'block',
              }}
            >
              you deserve it!
            </Text>
          </>
        ) : (
          <SmsSignUp color={color} onSubscribed={() => setSuccess(true)} />
        )}
      </Motion>
      <Text
        as="p"
        variant="copy"
        sx={{
          fontSize: 0,
          color,
        }}
        pb={4}
      >
        by submitting this form and signing up via text, you consent to receive
        marketing text messages, promotions and reminders from bluboho at the
        number provided! message and data rates may apply. message frequency
        varies. you can unsubscribe at any time by replying STOP or clicking the
        unsubscribe link in your e-mail. view our{' '}
        <Link
          as={GatsbyLink}
          to="/pages/privacy-policy"
          sx={{ fontWeight: '600', fontSize: 0 }}
        >
          Privacy Policy
        </Link>{' '}
        and{' '}
        <Link
          as={GatsbyLink}
          to="/pages/terms-of-service"
          sx={{ fontWeight: '600', fontSize: 0 }}
        >
          Terms of Service
        </Link>{' '}
        for more info.
      </Text>
    </AnimatePresence>
  )
}

export default SmsSubscribe
