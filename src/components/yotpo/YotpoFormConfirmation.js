import React from 'react'
import PropTypes from 'prop-types'
import { GiGlassCelebration } from 'react-icons/gi'
import { Text, Flex, Grid, Alert, Button } from 'theme-ui'

const useConfirmationCopy = type => {
  switch (type) {
    case 'question':
      return {
        title: 'Thank you for posting a question!',
        instruction:
          'Please click on the link in the confirmation email we just sent you to submit your question.',
        info: 'Your question will appear on the site once someone answers it.',
        icon: GiGlassCelebration,
      }
    default:
      return {
        title: 'Thank you for your post',
      }
  }
}

const YotpoFormConfirmation = ({ type, onClose }) => {
  const { title, instruction, info, icon: Icon } = useConfirmationCopy(type)
  return (
    <Grid sx={{ gridAutoFlow: 'row', gap: 5, justifyItems: 'center' }} px={6}>
      {Icon && <Icon size={48} />}
      <Text variant="caps" sx={{ fontSize: 2 }}>
        {title}
      </Text>
      {instruction && <Text>{instruction}</Text>}
      {info && <Text>{info}</Text>}
      <Button type="button" variant="primary" onClick={onClose}>
        Close this window
      </Button>
    </Grid>
  )
}

YotpoFormConfirmation.propTypes = {
  type: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default YotpoFormConfirmation
