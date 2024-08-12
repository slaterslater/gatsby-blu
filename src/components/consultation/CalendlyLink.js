// components/consultation/CalendlyLink.js

import { Box, Flex } from 'theme-ui'
import React from 'react'
import { CgArrowLongRight } from 'react-icons/cg'
import PropTypes from 'prop-types'

const CalendlyLink = ({
  children,
  order = 0,
  isActive = false,
  handleChange = () => {},
}) => (
  <Flex
    key={`calendly-link-${order}`}
    mx={[3, 3]}
    className={isActive ? 'active' : null}
    sx={{
      order,
      borderTop: '1px solid',
      borderBottom: '1px solid',
      // borderTopColor: order === 0 ? 'border' : 'white',
      // borderBottomColor: 'border',
      borderColor: 'transparent',
      alignItems: 'center',
      cursor: 'pointer',
    }}
    onClick={handleChange}
    onKeyDown={handleChange}
  >
    <Box
      as="a"
      py={5}
      pl={1}
      sx={{
        fontSize: 0,
        fontWeight: 'bold',
        letterSpacing: 'widest',
        display: 'block',
      }}
    >
      {children}
    </Box>
    <Box ml="auto" mr={2}>
      <CgArrowLongRight />
    </Box>
  </Flex>
)

CalendlyLink.propTypes = {
  // calendar: PropTypes.shape({
  //   title: PropTypes.string,
  //   slug: PropTypes.string,
  // }),
  children: PropTypes.any,
  order: PropTypes.number,
  isActive: PropTypes.bool,
  handleChange: PropTypes.func,
}

export default CalendlyLink
