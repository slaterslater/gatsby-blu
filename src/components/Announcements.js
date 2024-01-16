import React, { useState } from 'react'
import { Flex, Box, Heading, Text, Link } from 'theme-ui'
import { graphql, Link as GatsbyLink, useStaticQuery } from 'gatsby'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import useInterval from '../lib/useInterval'
import Modal from './Modal'

const AnnouncementText = ({ text, subtext }) => (
  <Flex sx={{ alignItems: 'baseline', overflow: 'hidden' }}>
    <Box>{text}</Box>
    <Box sx={{ fontSize: '5px' }} pl={1}>
      {subtext}
    </Box>
  </Flex>
)

const Announcement = ({ text, subtext, to, message, isVisible }) => {
  const [isOpen, setIsOpen] = useState(false)
  if (!isVisible) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: -3 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 2 }}
    >
      <Box
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
            <AnnouncementText text={text} subtext={subtext} />
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
            sx={{ textDecoration: 'none', textAlign: 'center' }}
          >
            <AnnouncementText text={text} subtext={subtext} />
          </Link>
        )}
      </Box>
    </motion.div>
  )
}

Announcement.propTypes = {
  text: PropTypes.string.isRequired,
  subtext: PropTypes.string,
  to: PropTypes.string,
  message: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
}

const Announcements = () => {
  const data = useStaticQuery(graphql`
    {
      sanitySiteAnnouncements {
        announcements {
          text
          subtext
          path
          message
        }
      }
    }
  `)
  const { announcements } = data.sanitySiteAnnouncements
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
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '-1px',
      }}
      bg="primary"
      color="cream"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence>
        {announcements.map(({ text, subtext, path, message }, i) => (
          <Announcement
            key={`${text}-${path}`}
            isVisible={current === i}
            text={text}
            subtext={subtext}
            to={path}
            message={message}
          />
        ))}
      </AnimatePresence>
    </Flex>
  )
}

export default Announcements
