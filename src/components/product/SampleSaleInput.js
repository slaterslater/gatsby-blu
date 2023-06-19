import { Text, Box, Label, Checkbox, Grid } from 'theme-ui'
import { Formik, Form, useFormikContext, Field } from 'formik'
import React, { useContext, useEffect } from 'react'
import { array, number, object, string } from 'yup'
import { ProductContext } from './ProductContext'

const AutoSave = () => {
  const ctx = useFormikContext()
  const { isValid, dirty, isSubmitting, submitForm } = ctx
  useEffect(() => {
    // console.log(ctx.values)
    if (!isValid || !dirty || isSubmitting) return
    submitForm()
  }, [ctx])

  return null
}

const SampleSaleInput = () => {
  const { product, setCustomAttributes } = useContext(ProductContext)
  if (!product.tags.includes('sample-sale')) return false

  const initialValues = {
    ringSizes: [],
    isGift: 'no',
  }

  const validationSchema = object({
    ringSizes: array().of(number()),
    isGift: string(),
  })

  return (
    <Formik
      validateOnMount
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        const { ringSizes, isGift } = values
        const sortedRingSizes = ringSizes.sort((a, b) => a - b).join(', ')
        const ringAttributes = {
          key: 'may include',
          value: ringSizes.length ? `ring size ${sortedRingSizes}` : null,
        }
        const giftAttributes = {
          key: 'gift',
          value: isGift === 'yes' ? 'yes' : null,
        }

        await Promise.all([
          setCustomAttributes(ringAttributes),
          setCustomAttributes(giftAttributes),
        ])
        resetForm({ values })
        setSubmitting(false)
      }}
    >
      <Form>
        <Box pt={2} sx={{ 'input[type="radio"]:checked': { bg: 'error' } }}>
          <Text variant="caps">which ring size(s) could we include?</Text>
          <Grid
            sx={{
              gap: 0,
              rowGap: 3,
              gridTemplateRows: '1fr 1fr',
              gridAutoFlow: 'column',
              maxWidth: 500,
            }}
            pl={3}
            my={3}
          >
            {[...Array(8).keys()].map(n => {
              const size = n + 3
              return (
                <Label
                  key={`ring-size-${size}`}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Field as={Checkbox} name="ringSizes" value={size} />
                  <Text>{size}</Text>
                </Label>
              )
            })}
          </Grid>
          <Text variant="caps">will this box be a gift?</Text>
          <Grid
            sx={{
              gap: 0,
              gridTemplateColumns: '1fr 1fr',
              width: '50%',
              maxWidth: 250,
            }}
            pl={3}
            mt={3}
          >
            {['yes', 'no'].map(value => (
              <Label
                key={`gift-${value}`}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <Field type="radio" as={Checkbox} name="isGift" value={value} />
                <Text>{value}</Text>
              </Label>
            ))}
          </Grid>
          <AutoSave />
        </Box>
      </Form>
    </Formik>
  )
}

export default SampleSaleInput
