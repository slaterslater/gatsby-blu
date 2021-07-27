import React, { useState, useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IconButton, Box, Text } from 'theme-ui'
import { IoIosClose } from 'react-icons/io'
import { NewsletterContext } from '../contexts/NewsletterContext'
import { NewsletterSignUp } from './NewsletterForm'
import { useTimeout } from '../lib/useTimeout'

const Outer = motion(Box)

const NewsletterSignUpPrompt = props => {
  const [isOn, setOn] = useState(false)
  const [success, setSuccess] = useState(false)
  const { subscribe, dismissPrompt, shouldPrompt } = useContext(
    NewsletterContext
  )

  useTimeout(() => {
    if (shouldPrompt) {
      setOn(true)
    }
  }, 5000)

  return (
    <AnimatePresence>
      {isOn && (
        <Outer
          initial={{ y: '20%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '20%', opacity: 0 }}
          transition={{ ease: 'easeInOut', duration: 0.3 }}
          p={3}
          px={7}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: ['wrap', 'wrap', 'nowrap'],
            bg: 'cream',
            zIndex: 10,
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            gap: [2, 2, 6],
          }}
        >
          <Text
            variant="copy"
            sx={{
              fontSize: 1,
              lineHeight: 'normal',
              transform: 'translateY(-1px)',
            }}
          >
            {success
              ? 'you are signed up! check your email for a welcome message'
              : 'subscribe to receive updates, access to exclusive deals, and more.'}
          </Text>
          {!success && (
            <Box sx={{ minWidth: 280, maxWidth: 360 }}>
              <NewsletterSignUp
                color="black"
                onSubscribed={() => setSuccess(true)}
              />
            </Box>
          )}
          <IconButton
            type="button"
            onClick={() => {
              dismissPrompt()
              setOn(false)
            }}
            sx={{
              position: 'absolute',
              right: '12px',
              bottom: '50%',
              transform: 'translateY(50%)',
            }}
          >
            <Text as={IoIosClose} sx={{ color: 'black', fontSize: 8 }} />
          </IconButton>
        </Outer>
      )}
    </AnimatePresence>
  )
}

export default NewsletterSignUpPrompt
