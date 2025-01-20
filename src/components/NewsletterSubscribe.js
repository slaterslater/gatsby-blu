import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { Box, Heading, Text } from 'theme-ui'
import { NewsletterSignUp } from './NewsletterForm'

const NewsletterSubscribe = ({ color = 'white' }) => {
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
            >
              you are signed up!
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
              check your email for a welcome message
            </Text>
          </>
        ) : (
          <NewsletterSignUp
            color={color}
            onSubscribed={() => setSuccess(true)}
          />
        )}
      </Motion>
    </AnimatePresence>
  )
}

export default NewsletterSubscribe
