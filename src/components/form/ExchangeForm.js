import React from 'react'
import { Box, Grid, Flex } from 'theme-ui'
import { Form, Formik } from 'formik'
import { pickBy } from 'lodash'
import * as Yup from 'yup'
import {
  HoneypotControl,
  InputControl,
  SelectControl,
  TextareaControl,
} from '../app/formik/FormControlWrap'
import SubmitButton from '../app/formik/SubmitButton'

const formKeys = {
  orderNumber: 'order number',
  pieceToExchange: 'piece to exchange',
  firstName: 'first name',
  lastName: 'last name',
  email: 'email',
  phone: 'phone',
  exchangeFor: 'exchange for',
  message: 'message',
}

const resolutionOptions = ['Another Item', 'Store Credit']

const initialValues = Object.keys(formKeys).reduce(
  (acc, el) => ({ ...acc, [formKeys[el]]: '' }),
  {}
)

const validationSchema = Yup.object().shape({
  [formKeys.orderNumber]: Yup.string().required(),
  [formKeys.pieceToExchange]: Yup.string().required(),
  [formKeys.firstName]: Yup.string().required(),
  [formKeys.lastName]: Yup.string().required(),
  [formKeys.email]: Yup.string().email().required(),
  [formKeys.phone]: Yup.string().required(),
  [formKeys.exchangeFor]: Yup.string().required(),
  [formKeys.message]: Yup.string(),
  decepticons: Yup.string(),
})

const ExchangeForm = ({ onSuccess }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={async (values, actions) => {
      const body = pickBy(values, val => !!val)
      const guest = `${values['first name']} ${values['last name']} (${values.email})`
      body.subject = `webstore exchange request from ${guest}`
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        actions.resetForm()
        onSuccess()
      } catch (e) {
        console.error(e)
      }
      actions.setSubmitting(false)
    }}
  >
    <Box as={Form} py={4}>
      <HoneypotControl name="decepticons" />
      <InputControl
        name={formKeys.orderNumber}
        label={formKeys.orderNumber}
        id="order_number"
      />
      <InputControl
        name={formKeys.pieceToExchange}
        label={formKeys.pieceToExchange}
        id="order_piece"
      />
      <Grid sx={{ gridTemplateColumns: ['1fr', '1fr 1fr'], rowGap: 0 }}>
        <InputControl
          name={formKeys.firstName}
          label={formKeys.firstName}
          id="first_name"
        />
        <InputControl
          name={formKeys.lastName}
          label={formKeys.lastName}
          id="last_name"
        />
        <InputControl
          name={formKeys.email}
          label={formKeys.email}
          type="email"
          id="email"
        />
        <InputControl name={formKeys.phone} label={formKeys.phone} id="phone" />
      </Grid>
      <SelectControl
        name={formKeys.exchangeFor}
        label="What item do you want to exchange for?"
        id="phone"
        placeholder="make a selection"
      >
        {resolutionOptions.map(opt => (
          <option value={opt} key={opt}>
            {opt}
          </option>
        ))}
      </SelectControl>
      <TextareaControl
        name={formKeys.message}
        label="Additional Details"
        id="details"
      />
      <Flex>
        <SubmitButton sx={{ flex: 1 }}>Submit</SubmitButton>
      </Flex>
    </Box>
  </Formik>
)

export default ExchangeForm
