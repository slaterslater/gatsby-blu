import React from 'react'
import { Button, Flex } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import PropTypes from 'prop-types'

const BrownButton = ({ to, text }) => (
  <Flex
    sx={{
      height: 150,
      // width: ['130%', '130%', '100%'],
      backgroundImage: 'url("/button_background_brown.webp")',
      backgroundSize: '100% 150px',
      justifyContent: 'center',
      alignItems: 'center',
      button: { height: 'max-content' },
    }}
    my={4}
  >
    <Button as={GatsbyLink} variant="outline" to={to}>
      {text}
    </Button>
  </Flex>
)

export default BrownButton

BrownButton.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}
