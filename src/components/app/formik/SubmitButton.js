import { useFormikContext } from 'formik'
import { Button } from 'theme-ui'

const SubmitButton = props => {
  const { isSubmitting } = useFormikContext()

  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      variant="primary"
      {...props}
    />
  )
}

export default SubmitButton
