import { Box, Text, IconButton, Flex } from 'theme-ui'
import { IoIosClose } from 'react-icons/io'
import React from 'react'

const NavigationDrawer = ({ onClose }) => (
  <Box>
    <Flex p={4}>
      <IconButton p={0} onClick={onClose}>
        <Text as={IoIosClose} size={36} />
      </IconButton>
    </Flex>
    menu
  </Box>
)

export default NavigationDrawer
