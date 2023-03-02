import React, { useState } from 'react'
import { Divider, Link, Box, Text } from 'theme-ui'
// import { IoIosAdd } from 'react-icons/io'
import { BsChevronDown } from 'react-icons/bs'

const Accordion = ({ title, children }) => {
  const [open, set] = useState(false)

  return (
    <Box sx={{ position: 'relative' }}>
      <Box py={4} pr={2} pl={4}>
        <Link
          sx={{ display: 'flex', textDecoration: 'none' }}
          onClick={() => set(prev => !prev)}
        >
          <Text sx={{ flex: 1 }} variant="caps">
            {title}
          </Text>
          <Text as={BsChevronDown} />
        </Link>
      </Box>
      <Divider />
      {open && <Box pb={3}>{children}</Box>}
    </Box>
  )
}

export default Accordion
