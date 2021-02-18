import React, { useState } from 'react'
import { Flex, Box, Text, Link } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import useInterval from '../lib/useInterval'

const Announcement = ({ text, to, isVisible }) =>
  isVisible ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Text as="p" sx={{ fontSize: 0, letterSpacing: 'wider' }} variant="caps">
        <Link
          as={GatsbyLink}
          color="inherit"
          to={to}
          sx={{ textDecoration: 'none' }}
        >
          {text}
        </Link>
      </Text>
    </motion.div>
  ) : null

Announcement.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
}

const Announcements = ({ announcements }) => {
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
      bg="cream"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence>
        {announcements.map(({ text, to }, i) => (
          <Announcement
            key={`${text}-${to}`}
            isVisible={current === i}
            {...{ text, to }}
          />
        ))}
      </AnimatePresence>
    </Flex>
  )
}

Announcements.propTypes = {
  announcements: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      to: PropTypes.string,
    })
  ),
}

export default Announcements
