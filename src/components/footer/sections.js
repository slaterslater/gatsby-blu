import { Text, Heading, Container, Flex, Box, Grid, IconButton } from 'theme-ui'
import React, { useState, useEffect } from 'react'
import { VscChevronDown } from 'react-icons/vsc'

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
