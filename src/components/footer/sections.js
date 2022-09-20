import { Text, Heading, Container, Flex, Box, Grid, IconButton } from 'theme-ui'
import React, { useState, useEffect } from 'react'
import { VscChevronDown } from 'react-icons/vsc'
import { AnimatePresence, motion } from 'framer-motion'
import NewsletterSignUp from '../NewsletterForm'

export const CollapsibleFooterSection = ({ title, sx, children, ...props }) => {
  const [isOpen, setOpen] = useState(false)
  return (
    <Box sx={{ flex: 1, ...(sx || {}) }} {...props}>
      <Flex
        px={[6, 0]}
        role="button"
        aria-pressed={isOpen}
        onClick={() => setOpen(prev => !prev)}
      >
        <Heading
          variant="caps"
          as="h2"
          sx={{ color: 'white', whiteSpace: 'nowrap' }}
          pb={5}
        >
          {title}
        </Heading>
        <Box
          as={VscChevronDown}
          ml="auto"
          color="gray"
          sx={{ display: ['block', 'none'] }}
        />
      </Flex>
      <Box
        p={[6, 0]}
        pt={0}
        sx={{ display: [isOpen ? 'block' : 'none', 'block'] }}
      >
        {children}
      </Box>
    </Box>
  )
}

export const FooterSection = ({
  title,
  sx,
  mobileCollapse,
  children,
  ...props
}) => (
  <Box sx={{ flex: 1, ...(sx || {}) }} {...props}>
    <Heading
      variant="caps"
      as="h3"
      sx={{ color: 'white', whiteSpace: 'nowrap' }}
      pb={5}
    >
      {title}
    </Heading>
    {children}
  </Box>
)

export const FooterNewsletterSubscribe = ({ color = 'white' }) => {
  const [success, setSuccess] = useState(false)
  const Motion = motion(Box)
  useEffect(() => {
    if (success)
      setTimeout(() => {
        setSuccess(false)
      }, 8000)
  }, [success])
  return (
    <AnimatePresence>
      <Text
        variant="copy"
        sx={{
          fontSize: 0,
          color,
          transform: 'translateY(-5px)',
          display: 'block',
        }}
        pb={4}
      >
        handcrafted in toronto. ethically sourced. sign up today for the latest
        news, updates, and collection launches.
      </Text>
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
