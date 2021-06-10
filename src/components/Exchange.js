import { Box } from 'theme-ui'
import React, { useState } from 'react'
import { BiHeart } from 'react-icons/bi'
import ExchangeForm from './form/ExchangeForm'
import { CalloutBox } from './product/ProductCTACallout'

const Exchange = props => {
  const [success, setSuccess] = useState(false)

  if (success)
    return (
      <Box pb={6}>
        <CalloutBox
          icon={BiHeart}
          title="Your exchange request has been submitted!"
          description="We will reach out shortly"
          bg="cream"
        />
      </Box>
    )

  return <ExchangeForm onSuccess={() => setSuccess(true)} />
}

export default Exchange
