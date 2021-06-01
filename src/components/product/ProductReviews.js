import React, { useReducer, useState } from 'react'
import {
  Text,
  Link,
  Box,
  Button,
  NavLink,
  Grid,
  Flex,
  IconButton,
  Container,
  Divider,
  Alert,
} from 'theme-ui'
import { IoEllipsisHorizontalSharp } from 'react-icons/io5'
import Tippy from '@tippyjs/react'
import ProductReview from './ProductReview'
import ProductQuestion from './ProductQuestion'
import Modal from '../Modal'
import ReviewForm from '../ReviewForm'
import QuestionForm from '../QuestionForm'

const reducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_TOOLTIP':
      return { ...state, tooltipVisible: !state.tooltipVisible }
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
  const [
    { tooltipVisible, currentTab, currentModal, modalOpen },
    dispatch,
  ] = useReducer(reducer, {
    currentTab: 'reviews',
    currentModal: null,
    modalOpen: false,
  })

  return (
    <Box py={8} id="reviews">
      <Flex
        pb={6}
        sx={{ alignItems: 'baseline', flexWrap: 'wrap', gap: [6, 0] }}
      >
        <Flex>
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
        <Flex sx={{ display: ['flex', 'none'] }} ml="auto">
          <Tippy
            interactive
            theme="light"
            visible={tooltipVisible}
            onClickOutside={() => dispatch({ type: 'TOGGLE_TOOLTIP' })}
            trigger="manual"
            content={
              <Flex sx={{ flexDirection: 'column' }} p={1}>
                <Button
                  onClick={() => {
                    dispatch({
                      type: 'SET_CURRENT_MODAL',
                      currentModal: 'review',
                    })
                    dispatch({
                      type: 'TOGGLE_TOOLTIP',
                    })
                  }}
                  sx={{
                    letterSpacing: 'caps',
                    bg: 'transparent',
                    fontSize: 0,
                    color: 'white',
                  }}
                  p={0}
                  mb={2}
                >
                  Write a Review
                </Button>
                <Button
                  onClick={() => {
                    dispatch({
                      type: 'SET_CURRENT_MODAL',
                      currentModal: 'question',
                    })
                    dispatch({
                      type: 'TOGGLE_TOOLTIP',
                    })
                  }}
                  sx={{
                    letterSpacing: 'caps',
                    bg: 'transparent',
                    fontSize: 0,
                    color: 'white',
                  }}
                  p={0}
                >
                  Ask A Question
                </Button>
              </Flex>
            }
          >
            <IconButton
              type="button"
              onClick={() => dispatch({ type: 'TOGGLE_TOOLTIP' })}
            >
              <IoEllipsisHorizontalSharp size={20} />
            </IconButton>
          </Tippy>
        </Flex>
        <Box sx={{ display: ['none', 'flex'] }} ml="auto">
          <Flex>
            <Button
              type="button"
              variant="inverted"
              mr={2}
              onClick={() =>
                dispatch({
                  type: 'SET_CURRENT_MODAL',
                  currentModal: 'question',
                })
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
        </Box>
      </Flex>
      <Modal
        isOpen={modalOpen}
        setOpen={nextIsOpen =>
          dispatch({ type: 'SET_CURRENT_MODAL', currentModal: false })
        }
      >
        {currentModal === 'review' && (
          <ReviewForm
            yotpoProductDetails={yotpoProductDetails}
            onClose={() => dispatch({ type: 'CLOSE_MODAL' })}
          />
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
            <React.Fragment key={node.id}>
              <Divider />
              <ProductReview {...node} />
            </React.Fragment>
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
    </Box>
  )
}

export default ProductReviews
