import { Box, Text } from 'theme-ui'
import { Formik, Form, useFormikContext } from 'formik'
import React, { useEffect } from 'react'
import * as Yup from 'yup'
import FormControlWrap, {
  InputControl,
  SelectControl,
} from '../app/formik/FormControlWrap'
import RevealBox from '../RevealBox'
// import { AutoSave } from '../app/formik/AutoSave'
//
const AutoSave = () => {
  const ctx = useFormikContext()

  useEffect(() => {
    if (ctx.isValid && ctx.dirty && !ctx.isSubmitting) {
      console.log({ isValid: ctx.isValid, ctx })
      console.log('submit form')
      ctx.submitForm()
    }
  }, [ctx])

  return null
}

export const useEngraveableChars = (tags = []) => {
  if (tags.includes('5 letter engraving')) {
    return 5
  }
  if (tags.includes('legacy ring Engravable')) return 12
  if (tags.includes('engraveable')) return 1
  return 0
}

const Engraving = ({ tags, onChange }) => {
  const chars = useEngraveableChars(tags)

  return (
    <EngravingForm
      chars={chars}
      hasLocation={tags.includes('legacy ring Engravable')}
      onSubmit={async ({ text, font, location }) => {
        // console.log({ text, font, location })
        await onChange({
          key: 'engraving',
          value: `"${text}", ${font}${location ? `, ${location}` : ''}`,
        })
      }}
    />
  )
}

const fontOptions = ['trajan pro', 'petite formal script']
const locationOptions = ['inside', 'outside']

const EngravingForm = ({ chars, hasLocation, onSubmit }) => {
  const initialValues = {
    text: '',
    font: '',
  }

  const validationShape = {
    text: Yup.string().max(chars).required(),
    font: Yup.string().required(),
  }

  if (hasLocation) {
    initialValues.location = ''
    validationShape.location = Yup.string()
  }

  const validationSchema = Yup.object().shape(validationShape)

  return (
    <Formik
      validateOnMount
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        await onSubmit(values)
        resetForm({ values })
        setSubmitting(false)
      }}
    >
      <Form>
        <RevealBox title="add engraving">
          <Box py={2} px={3} mb={4} sx={{ bg: 'lightGray', borderRadius: 3 }}>
            <Text sx={{ fontSize: 0, color: 'darkerGray' }}>
              Up to {chars} characters
            </Text>
          </Box>
          <InputControl
            label="text"
            id="engraving_text"
            name="text"
            maxLength={chars}
          />
          <Text as="p" sx={{ fontSize: 0, color: 'darkGray' }} pb={4}>
            characters are engraved exactly as shown
          </Text>
          <SelectControl
            label="font"
            id="font"
            name="font"
            placeholder="choose a font style"
            showErrors={false}
          >
            {fontOptions.map(opt => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </SelectControl>
          {hasLocation && (
            <SelectControl
              label="engraving location"
              id="location"
              name="location"
              placeholder="choose a location"
              showErrors={false}
            >
              {locationOptions.map(opt => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </SelectControl>
          )}
          <AutoSave />
        </RevealBox>
      </Form>
    </Formik>
  )
}

export default Engraving
