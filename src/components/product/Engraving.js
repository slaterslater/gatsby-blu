import { Text, Box } from 'theme-ui'
import { Formik, Form, useFormikContext } from 'formik'
import React, { useContext, useEffect } from 'react'
import * as Yup from 'yup'
import { StaticImage } from 'gatsby-plugin-image'
import { InputControl, SegmentedControl } from '../app/formik/FormControlWrap'
import RevealBox from '../RevealBox'
import { ProductContext } from './ProductContext'

const AutoSave = () => {
  const ctx = useFormikContext()

  useEffect(() => {
    if (ctx.isValid && ctx.dirty && !ctx.isSubmitting) {
      console.log({ isValid: ctx.isValid, ctx })
      ctx.submitForm()
    }
  }, [ctx])

  return null
}

export const useEngraveableChars = (tags = [], metafields = []) => {
  const metafieldChars = metafields.find(
    ({ key }) => key === 'engravable_characters'
  )?.value
  if (metafieldChars) return metafieldChars
  // remove the below conditions after product audit
  if (tags.includes('5 letter engraving')) {
    return 5
  }
  if (tags.includes('legacy ring Engravable')) return 12
  if (tags.includes('engraveable')) return 1
  return 0
}

const Engraving = () => {
  const {
    product: { tags, metafields },
    setCustomAttributes,
  } = useContext(ProductContext)
  const chars = useEngraveableChars(tags, metafields)
  if (!chars) return false

  return (
    <EngravingForm
      chars={chars}
      hasLocation={tags.some(
        tag => tag.toLowerCase() === 'legacy ring engravable'
      )}
      onSubmit={async ({ text, font, location }) => {
        setCustomAttributes({
          key: 'engraving',
          value: `"${text}", ${font}${location ? `, ${location}` : ''}`,
        })
      }}
    />
  )
}

const locationOptions = [{ value: 'inside' }, { value: 'outside' }]

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
          <InputControl
            label="text"
            id="engraving_text"
            name="text"
            maxLength={chars}
          />
          <SegmentedControl
            label="font"
            id="font"
            name="font"
            placeholder="choose a font style"
            showErrors={false}
            options={[
              {
                value: 'trajan pro',
                component: (
                  <StaticImage
                    src="../../images/trajan-pro.png"
                    alt="trajan pro"
                    quality={100}
                    height={14}
                  />
                ),
              },
              {
                value: 'petit formal script',
                component: (
                  <StaticImage
                    src="../../images/petit-formal-script-preview.png"
                    alt="petit formal script"
                    quality={100}
                    height={14}
                  />
                ),
              },
            ]}
          />
          {hasLocation && (
            <SegmentedControl
              label="engraving location"
              id="location"
              name="location"
              placeholder="choose a location"
              showErrors={false}
              options={locationOptions}
            />
          )}
          <Box as="ul" sx={{ listStyleType: 'none' }} p={1}>
            {[
              `up to ${chars} character${chars > 1 ? 's' : ''}`,
              'characters are engraved exactly as shown',
              'allow 2-3 weeks for engraving',
            ].map((text, i) => (
              <Box
                key={`engraving-fyi-${i}`}
                as="li"
                sx={{
                  fontSize: 0,
                  color: 'darkerGray',
                  letterSpacing: 'wider',
                }}
                pb={1}
              >
                {text}
              </Box>
            ))}
          </Box>
          <AutoSave />
        </RevealBox>
      </Form>
    </Formik>
  )
}

export default Engraving
