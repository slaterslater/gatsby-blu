import { Flex } from 'theme-ui'
import React, { useContext } from 'react'
import ThemeLink from '../app/ThemeLink'
import { ProductContext } from './ProductContext'

const getButtonConfigured = (metafields = []) => {
  const { value } =
    metafields?.find(field => field.key === 'engagement_consultation_button') ||
    {}
  return value === 'true'
}

export const EngagementConsultationButton = props => {
  const {
    product: { productType, metafields },
  } = useContext(ProductContext)

  const hasButtonConfigured = getButtonConfigured(metafields)

  if (productType === 'Engagement Ring' || hasButtonConfigured)
    return (
      <Flex>
        <ThemeLink
          variant="outlineButton"
          sx={{ flex: 1, textAlign: 'center', fontSize: 1 }}
          to="/book-a-consultation"
        >
          Book a Consultation
        </ThemeLink>
      </Flex>
    )

  return null
}
