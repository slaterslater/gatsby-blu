import { Box, Flex, Text } from 'theme-ui'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { BiPlus, BiMinus } from 'react-icons/bi'

const RevealBox = ({ title, children }) => {
  const [open, setOpen] = useState(false)

  const toggle = () => setOpen(prev => !prev)

  return (
    <Box>
      <Flex
        onClick={toggle}
        role="button"
        aria-pressed={open}
        sx={{ cursor: 'pointer' }}
      >
        {open ? <BiMinus /> : <BiPlus />}
        <Text ml={2} variant="caps">
          {title}
        </Text>
      </Flex>
      {open && typeof children === 'function' && children({ toggle })}
      {open && typeof children !== 'function' && <Box pt={2}>{children}</Box>}
    </Box>
  )
}

RevealBox.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
}

export default RevealBox
