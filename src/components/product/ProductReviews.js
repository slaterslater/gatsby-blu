import React, { useState } from 'react'
import { Text, Box, Grid, Divider, Alert } from 'theme-ui'
import ProductReview from './ProductReview'
import ProductQuestion from './ProductQuestion'
import Modal from '../Modal'
import ReviewForm from '../ReviewForm'
import QuestionForm from '../QuestionForm'
import ReviewTabs from '../reviews/ReviewTabs'
import PaginatedReviews from '../reviews/PaginatedReviews'
import PaginatedQuestions from '../reviews/PaginatedQuestions'

const ProductReviews = ({ yotpoProductDetails }) => {
  const [currentModal, setCurrentModal] = useState(null)
  const [currentTab, setCurrentTab] = useState('reviews')

  const closeModal = () => setCurrentModal('')

  return (
    <Box
      sx={{ display: 'grid', gap: 7, maxWidth: 840, mx: 'auto' }}
      py={8}
      id="reviews"
    >
      <ReviewTabs
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        setCurrentModal={setCurrentModal}
      />
      <Divider />
      {currentTab === 'reviews' && <PaginatedReviews />}
      {currentTab === 'qa' && <PaginatedQuestions />}
      <Modal isOpen={!!currentModal} setOpen={closeModal}>
        {currentModal === 'review' && (
          <ReviewForm
            yotpoProductDetails={yotpoProductDetails}
            onClose={closeModal}
          />
        )}
        {currentModal === 'question' && (
          <QuestionForm
            yotpoProductDetails={yotpoProductDetails}
            onClose={closeModal}
          />
        )}
      </Modal>
    </Box>
  )
}

export default ProductReviews
