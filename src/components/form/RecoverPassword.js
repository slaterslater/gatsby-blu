import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useMutation } from 'urql'
import React, { useContext, useState } from 'react'
import { Text, Box, Button, Label, Input } from 'theme-ui'
import * as yup from 'yup'
import { CustomerPasswordRecover } from '../../mutations/auth'
import SubmitButton from '../app/formik/SubmitButton'
import { InputControl } from '../app/formik/FormControlWrap'

const initialValues = { email: '' }
const validationSchema = yup.object({
  email: yup.string().email().required(),
})

const RecoverPassword = ({ onSuccess }) => {
  const [, recoverPassword] = useMutation(CustomerPasswordRecover)

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async ({ email }, { setSubmitting }) => {
        try {
          const res = await recoverPassword({ email })
          console.log(res)
          onSuccess()
        } catch (e) {
          console.log(e)
        }
      }}
    >
      <Form>
        <InputControl
          name="email"
          id="recover_email"
          placeholder="your email"
          label="enter the email associated with your account"
        />
        <SubmitButton>Submit</SubmitButton>
      </Form>
    </Formik>
  )
}

export default RecoverPassword
