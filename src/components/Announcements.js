import React, { useState } from 'react'
import { Flex, Box, Heading, Text, Link } from 'theme-ui'
import { graphql, Link as GatsbyLink, useStaticQuery } from 'gatsby'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import useInterval from '../lib/useInterval'
import Modal from './Modal'

const Announcement = ({ text, to, message, isVisible }) => {
  const [isOpen, setIsOpen] = useState(false)
  return isVisible ? (
    <motion.div
      initial={{ opacity: 0, y: -3 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 2 }}
    >
      <Text
        as="p"
        sx={{ fontSize: 0, letterSpacing: '.05em', fontWeight: 'heading' }}
        variant="caps"
      >
        {message ? (
          <Box
            role="button"
            aria-pressed={isOpen}
            onClick={() => setIsOpen(prev => !prev)}
            sx={{ cursor: 'pointer' }}
          >
            {text}
            <Modal isOpen={isOpen} setOpen={setIsOpen} width={1100}>
              <Box sx={{ textAlign: 'center' }}>
                <Heading variant="h2" sx={{ fontSize: 3 }} pb={4}>
                  {text}
                </Heading>
                <Text>{message}</Text>
              </Box>
            </Modal>
          </Box>
        ) : (
          <Link
            as={to ? GatsbyLink : 'span'}
            color="inherit"
            to={to}
            sx={{ textDecoration: 'none' }}
          >
            {text}
          </Link>
        )}
      </Text>
    </motion.div>
  ) : null
}

Announcement.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string,
  message: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
}

const Announcements = () => {
  const data = useStaticQuery(graphql`
    {
      allSanitySiteAnnouncements {
        nodes {
          announcements {
            text
            path
            message
          }
        }
      }
    }
  `)
  const { announcements } = data.allSanitySiteAnnouncements.nodes[0]
  const [delay] = useState(5000)
  const [isPaused, setIsPaused] = useState(false)
  const [current, setCurrent] = useState(0)
  useInterval(
    () => {
      setCurrent(curr => {
        if (curr + 1 >= announcements.length) {
          return 0
        }
        return curr + 1
      })
    },
    isPaused ? null : delay
  )

  return (
    <Flex
      p={[3]}
      sx={{ justifyContent: 'center', alignItems: 'center' }}
      bg="primary"
      color="white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence>
        {announcements.map(({ text, path, message }, i) => (
          <Announcement
            key={`${text}-${path}`}
            isVisible={current === i}
            text={text}
            to={path}
            message={message}
          />
        ))}
      </AnimatePresence>
    </Flex>
  )
}

export default Announcements
