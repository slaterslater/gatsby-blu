import React, { useReducer, useState } from 'react'
import {
  Text,
  Box,
  Button,
  NavLink,
  Grid,
  Flex,
  Container,
  Divider,
  Alert,
} from 'theme-ui'
import ProductReview from './ProductReview'
import ProductQuestion from './ProductQuestion'
import Modal from '../Modal'
import ReviewForm from '../ReviewForm'
import QuestionForm from '../QuestionForm'

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_TAB':
      return { ...state, currentTab: action.currentTab }
    case 'SET_CURRENT_MODAL':
      return {
        ...state,
        modalOpen: !!action.currentModal,
        currentModal: action.currentModal || null,
      }
    case 'CLOSE_MODAL':
      return {
        ...state,
        modalOpen: false,
        currentModal: null,
      }
    default:
      return state
  }
}

const ProductReviews = ({
  yotpoProductReview,
  yotpoProductQa,
  yotpoProductDetails,
}) => {
  const [{ currentTab, currentModal, modalOpen }, dispatch] = useReducer(
    reducer,
    {
      currentTab: 'reviews',
      currentModal: null,
      modalOpen: false,
    }
  )

  return (
    <Container pt={8}>
      <Flex sx={{ alignItems: 'baseline' }}>
        <Flex pb={6}>
          <NavLink
            onClick={() =>
              dispatch({ type: 'SET_CURRENT_TAB', currentTab: 'reviews' })
            }
            mr={4}
          >
            Reviews
          </NavLink>
          <NavLink
            onClick={() =>
              dispatch({ type: 'SET_CURRENT_TAB', currentTab: 'questions' })
            }
          >
            Questions
          </NavLink>
        </Flex>
        <Button
          type="button"
          variant="inverted"
          ml="auto"
          mr={2}
          onClick={() =>
            dispatch({ type: 'SET_CURRENT_MODAL', currentModal: 'question' })
          }
        >
          Ask a Question
        </Button>
        <Button
          type="button"
          variant="inverted"
          onClick={() =>
            dispatch({ type: 'SET_CURRENT_MODAL', currentModal: 'review' })
          }
        >
          Write a Review
        </Button>
      </Flex>
      <Modal
        isOpen={modalOpen}
        setOpen={nextIsOpen =>
          dispatch({ type: 'SET_CURRENT_MODAL', currentModal: false })
        }
      >
        {currentModal === 'review' && (
          <ReviewForm yotpoProductDetails={yotpoProductDetails} />
        )}
        {currentModal === 'question' && (
          <QuestionForm
            yotpoProductDetails={yotpoProductDetails}
            onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
          />
        )}
      </Modal>

      {currentTab === 'reviews' && (
        <Grid sx={{ gridAutoFlow: 'row', gap: 7 }}>
          {yotpoProductReview?.reviews.map(node => (
            <>
              <Divider />
              <ProductReview key={node.id} {...node} />
            </>
          ))}
          {!yotpoProductReview?.reviews?.length && (
            <Alert variant="empty">
              <Text sx={{ fontSize: 1 }}>There are no reviews</Text>
            </Alert>
          )}
        </Grid>
      )}
      {currentTab === 'qa' && (
        <Grid sx={{ gridAutoFlow: 'row', gap: 7 }}>
          {yotpoProductQa?.questions.map(node => (
            <>
              <Divider />
              <ProductQuestion key={node.id} {...node} />
            </>
          ))}
          {!yotpoProductQa?.length && (
            <Alert variant="empty">
              <Text sx={{ fontSize: 1 }}>There are no questions</Text>
            </Alert>
          )}
        </Grid>
      )}
    </Container>
  )
}

export default ProductReviews
