// components/consultation/CalendlyLink.js

import { Box, Flex } from 'theme-ui'
import React from 'react'
import { CgArrowLongRight } from 'react-icons/cg'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const CalendlyLinkStyles = styled.div`
  order: ${props => props.order};
  .active {
    border-color: black;
  }
`

const CalendlyLink = ({ calendar, order, isActive, setCurrent }) => (
  <CalendlyLinkStyles order={order}>
    <Flex
      key={`booking-${calendar.slug}`}
      mx={[3, 3]}
      className={isActive ? 'active' : null}
      sx={{
        borderTop: '1px solid',
        borderBottom: '1px solid',
        borderTopColor: order === 0 ? 'border' : 'white',
        borderBottomColor: 'border',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      onClick={() => {
        setCurrent({
          index: order,
          ...calendar,
        })
      }}
      onKeyDown={() => {
        setCurrent({
          index: order,
          ...calendar,
        })
      }}
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
        {calendar.title.toLowerCase()}
      </Box>
      <Box ml="auto" mr={2}>
        <CgArrowLongRight />
      </Box>
    </Flex>
  </CalendlyLinkStyles>
)

CalendlyLink.propTypes = {
  calendar: PropTypes.shape({
    title: PropTypes.string,
    slug: PropTypes.string,
  }),
  order: PropTypes.number,
  isActive: PropTypes.bool,
  setCurrent: PropTypes.func,
}

export default CalendlyLink
