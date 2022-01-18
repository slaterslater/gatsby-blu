import React, { useState } from 'react'
import { Flex, Box, Text, Link } from 'theme-ui'
import { graphql, Link as GatsbyLink, useStaticQuery } from 'gatsby'
import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import useInterval from '../lib/useInterval'

const Announcement = ({ text, to, isVisible }) =>
  isVisible ? (
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
        <Link
          as={to ? GatsbyLink : 'span'}
          color="inherit"
          to={to}
          sx={{ textDecoration: 'none', color: 'white' }}
        >
          {text}
        </Link>
      </Text>
    </motion.div>
  ) : null

Announcement.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string,
  isVisible: PropTypes.bool.isRequired,
}
Announcement.defaultProps = {
  to: '',
}

const Announcements = () => {
  const data = useStaticQuery(graphql`
    {
      allSanitySiteAnnouncements {
        nodes {
          announcements {
            text
            path
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
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence>
        {announcements.map(({ text, path }, i) => (
          <Announcement
            key={`${text}-${path}`}
            isVisible={current === i}
            text={text}
            to={path}
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
