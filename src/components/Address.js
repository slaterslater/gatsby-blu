import React from 'react'
import { Box, Text } from 'theme-ui'
import PropTypes from 'prop-types'

const LineText = props => (
  <Text as="p" pb={1} sx={{ '&:empty': { display: 'none' } }} {...props} />
)

const MailingAddress = ({ mailingAddress }) => (
  <Box>
    <LineText pb={2}>{mailingAddress.name}</LineText>
    <LineText>{mailingAddress.address1}</LineText>
    <LineText>{mailingAddress.address2}</LineText>
    <LineText>{mailingAddress.company}</LineText>
    <LineText>{mailingAddress.formattedArea}</LineText>
    <LineText>{mailingAddress.zip}</LineText>
  </Box>
)

MailingAddress.propTypes = {
  mailingAddress: PropTypes.shape({
    address1: PropTypes.string.isRequired,
    address2: PropTypes.string,
    name: PropTypes.string.isRequired,
    company: PropTypes.string,
    formattedArea: PropTypes.string.isRequired,
    zip: PropTypes.string,
  }).isRequired,
}

export default MailingAddress
