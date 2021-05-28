import React, { useContext } from 'react'

import { Form, Formik, Field } from 'formik'
import { Flex, Box, Textarea } from 'theme-ui'
import { useMutation } from 'urql'
import RevealBox from './RevealBox'
import { StoreContext } from '../contexts/StoreContext'
import { CHECKOUT_QUERY } from '../queries/checkout'
import SubmitButton from './app/formik/SubmitButton'
import { UpdateCheckoutAttributes } from '../mutations/cart'

const OrderNote = ({ initialNote }) => {
  const { checkoutId } = useContext(StoreContext)
  const [, updateCheckoutAttributes] = useMutation(UpdateCheckoutAttributes)

  return (
    <Box px={4}>
      <RevealBox title="Add a Note">
        {({ toggle }) => (
          <Box py={4} px={3} mb={4} sx={{ bg: 'lightGray', borderRadius: 3 }}>
            <Formik
              initialValues={{ note: initialNote }}
              onSubmit={async (input, { setSubmitting }) => {
                try {
                  await updateCheckoutAttributes({ checkoutId, input })
                  setSubmitting(false)
                  toggle()
                } catch (e) {
                  console.error('error adding note')
                }
              }}
            >
              <Flex as={Form} sx={{ flexDirection: 'column' }}>
                <Field
                  placeholder="your note"
                  as={Textarea}
                  name="note"
                  sx={{ bg: 'white' }}
                />
                <SubmitButton mt={4} sx={{ flex: 1 }}>
                  Save Note
                </SubmitButton>
              </Flex>
            </Formik>
          </Box>
        )}
      </RevealBox>
    </Box>
  )
}

export default OrderNote
