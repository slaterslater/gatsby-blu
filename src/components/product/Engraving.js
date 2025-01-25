import { Text, Box, Flex } from 'theme-ui'
import { Formik, Form, useFormikContext } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { StaticImage } from 'gatsby-plugin-image'
import { BiPlus, BiMinus } from 'react-icons/bi'
import { InputControl, SegmentedControl } from '../app/formik/FormControlWrap'
import { ProductContext } from './ProductContext'

const AutoSave = () => {
  const ctx = useFormikContext()
  // would like to prevent bad char from being saved
  // would like previous entries to be deleted if dirty
  useEffect(() => {
    if (ctx.values.text === '3') {
      ctx.setErrors('nope', 'NOPE')
      ctx.setFieldValue('text', '0')
    }
    if (ctx.isValid && ctx.dirty && !ctx.isSubmitting) {
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
  const [open, setOpen] = useState(false)

  const initialValues = {
    text: '',
    font: '',
  }

  const isValidText = text =>
    text?.split('').some(char => {
      const code = char.charCodeAt()
      return code >= 32 && code <= 125
    })

  const ContactUs = () => (
    <Text sx={{ fontSize: 0, a: { color: 'error' } }}>
      for special characters, please{' '}
      <a href="mailto:guestexperience@bluboho.com">
        contact&nbsp;guest&nbsp;experience
      </a>
    </Text>
  )

  const validationShape = {
    font: Yup.string().required(),
    text: Yup.string()
      .max(chars)
      .required()
      .test(
        'is-valid-chars',
        () => <ContactUs />,
        value => isValidText(value)
      ),
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
      {({ resetForm, submitForm }) => (
        <Form>
          <Flex mx="auto" sx={{ justifyContent: 'center' }}>
            <Flex
              onClick={() => {
                setOpen(!open)
                resetForm({ values: initialValues })
                submitForm()
              }}
              role="button"
              aria-pressed={open}
              sx={{ cursor: 'pointer', alignItems: 'center' }}
            >
              {open ? <BiMinus /> : <BiPlus />}
              <Text ml={2} variant="caps">
                add engraving
              </Text>
            </Flex>
          </Flex>
          {open && (
            <Box pt={2}>
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
            </Box>
          )}
        </Form>
      )}
    </Formik>
  )
}

export default Engraving
