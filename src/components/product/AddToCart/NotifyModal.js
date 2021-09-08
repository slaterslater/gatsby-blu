import React, { useState, useContext } from 'react'
import { Button, Text, Heading, Flex } from 'theme-ui'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import Modal from '../../Modal'
import { useShopifyAdminIdNumber } from '../../../hooks/shopifyAdminId'
import { delay } from '../../../lib/delay'
import { ProductContext } from '../ProductContext'
import { InputControl } from '../../app/formik/FormControlWrap'
import SubmitButton from '../../app/formik/SubmitButton'
import { getObjectAsParam } from '../../../lib/param'

// further enhancement: grab logged in user's email for initial value
// i tried this but abandonned due to an issue with urql..
// swr looking real nice right now

const NotifyForm = ({ onSuccess }) => {
  const { product, selectedVariant } = useContext(ProductContext)

  const variantNo = useShopifyAdminIdNumber(selectedVariant?.shopifyId)
  const productNo = useShopifyAdminIdNumber(product?.shopifyId)

  return (
    <>
      <Heading pb={2} sx={{ textAlign: 'center' }}>
        email me when available
      </Heading>
      <Text as="p" pb={4} sx={{ textAlign: 'center' }}>
        get notified via email when{' '}
        <Text as="strong">{selectedVariant?.title}</Text> is back in stock
      </Text>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={yup.object({
          email: yup.string().required().email(),
        })}
        onSubmit={async ({ email }, { setSubmitting }) => {
          // timezone offset in seconds
          const customerUtcOffset = new Date().getTimezoneOffset() * 60
          const payload = {
            shop: process.env.GATSBY_SHOPIFY_SHOP_NAME,
            notification: {
              email,
              product_no: productNo,
              customer_utc_offset: customerUtcOffset,
              quantity_required: 1,
            },
            variant: {
              variant_no: variantNo,
            },
          }

          const payloadParams = getObjectAsParam(payload)

          try {
            const res = await fetch(
              `https://app.backinstock.org/stock_notification/create.json?${payloadParams}`
            ).then(r => r.json())

            // error 'base' returns a message that you're already submitted
            // we can pretend that's success
            if (
              res.status?.toLowerCase() === 'ok' ||
              res.errors?.base?.length === 1
            ) {
              console.log('new sign up or already signed up')
              onSuccess()
            } else {
              console.log('successful submission, some other problem', res)
            }
          } catch (e) {
            console.log('fetch fail', e)
          }
          setSubmitting(false)
          // request with payload
        }}
      >
        <Form>
          <Flex pb={4} sx={{ flexDirection: 'column', alignItems: 'stretch' }}>
            <InputControl name="email" label="email" placeholder="your email" />
            <SubmitButton sx={{ flex: 1 }}>Submit</SubmitButton>
          </Flex>
        </Form>
      </Formik>
      <Text variant="small">
        we will send you an email once the product becomes available. your email
        address will not be shared with anyone else.
      </Text>
    </>
  )
}

const FormSuccess = ({ onClose }) => (
  <Flex sx={{ flexDirection: 'column', alignItems: 'center ' }}>
    <Heading pb={2}>email submitted</Heading>
    <Text as="p" pb={4}>
      you will receive an email when this item becomes available!
    </Text>
    <Button type="button" onClick={onClose} sx={{ flex: 1 }}>
      close this
    </Button>
  </Flex>
)

const NotifyModal = ({ isOn, toggleOn }) => {
  const [showSuccess, setShowSuccess] = useState(false)
  return (
    <Modal isOpen={isOn} setOpen={toggleOn}>
      {showSuccess ? (
        <FormSuccess onClose={() => toggleOn()} />
      ) : (
        <NotifyForm onSuccess={() => setShowSuccess(true)} />
      )}
    </Modal>
  )
}

export default NotifyModal
