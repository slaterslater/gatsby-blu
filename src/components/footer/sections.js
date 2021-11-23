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
          as="h6"
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
      as="h6"
      sx={{ color: 'white', whiteSpace: 'nowrap' }}
      pb={5}
    >
      {title}
    </Heading>
    {children}
  </Box>
)

export const FooterNewsletterSubscribe = () => {
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
          color: 'white',
          transform: 'translateY(-5px)',
          display: 'block',
        }}
        pb={4}
      >
        handcrafted in toronto. ethically sourced. sign up today for the latest
        news, updates, and collection launches.
      </Text>
      {success ? (
        <Motion
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Text
            variant="copy"
            pt={7}
            sx={{
              fontSize: 0,
              color: 'white',
              fontFamily: 'body',
              display: 'block',
            }}
          >
            {/* Welcome to the Fam! */}
            you are signed up!
            <br />
            check your email for a welcome message
          </Text>
        </Motion>
      ) : (
        <Motion
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <NewsletterSignUp
            color="white"
            onSubscribed={() => setSuccess(true)}
          />
        </Motion>
      )}
    </AnimatePresence>
  )
}
