import React, { useState } from 'react'
import { Divider, Link, Box, Text, IconButton, Flex } from 'theme-ui'
import { IoIosAdd } from 'react-icons/io'

const Accordion = ({ title, children }) => {
  const [open, set] = useState(false)

  return (
    <Box sx={{ position: 'relative' }}>
      <Box py={4}>
        <Link
          sx={{ display: 'flex', textDecoration: 'none' }}
          onClick={() => set(prev => !prev)}
        >
          <Text sx={{ flex: 1 }} variant="caps">
            {title}
          </Text>
          <Text as={IoIosAdd} />
        </Link>
      </Box>
      <Divider />
      {open && <Box pb={5}>{children}</Box>}
    </Box>
  )
}

export default Accordion
