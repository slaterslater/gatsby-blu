import { Button } from 'theme-ui'
import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { ProductContext } from './ProductContext'

export const EngagementConsultationButton = () => {
  const {
    product: { productType, metafields },
  } = useContext(ProductContext)

  const shouldShowButton =
    metafields?.find(({ key }) => key === 'engagement_consultation_button')
      ?.value === 'true'

  if (productType !== 'Engagement Ring' && !shouldShowButton) return null
  return (
    <Button as={Link} variant="inverted" to="/book-a-consultation">
      Book a Consultation
    </Button>
  )
}
