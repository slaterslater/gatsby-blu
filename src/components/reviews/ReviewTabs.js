import React from 'react'
import { Button, Box, Flex } from 'theme-ui'

const NavHeading = ({ isCurrent, ...props }) => (
  <Button
    variant="caps"
    pb={1}
    sx={{
      fontWeight: 400,
      borderBottom: '1px solid',
      borderColor: isCurrent ? 'black' : 'transparent',
      backgroundColor: 'transparent',
      color: 'primary',
      borderRadius: 0,
      textTransform: 'uppercase',
      fontSize: 4,
      letterSpacing: 'widest',
      fontFamily: 'heading',
      padding: 0,
      cursor: 'pointer',
    }}
    {...props}
  />
)

const ReviewTabs = ({ currentTab, setCurrentTab, setCurrentModal }) => (
  <Box>
    <Flex sx={{ justifyContent: 'center', gap: 4 }} pb={5}>
      <NavHeading
        isCurrent={currentTab === 'reviews'}
        onClick={() => setCurrentTab('reviews')}
        mr={4}
      >
        Reviews
      </NavHeading>
      <NavHeading
        isCurrent={currentTab === 'qa'}
        onClick={() => setCurrentTab('qa')}
      >
        Questions
      </NavHeading>
    </Flex>
    <Flex sx={{ justifyContent: 'flex-end' }}>
      <Button
        type="button"
        variant="link"
        sx={{
          letterSpacing: 'wider',
          textTransform: 'uppercase',
          fontSize: 0,
          fontWeight: 500,
        }}
        mr={2}
        onClick={() => setCurrentModal('question')}
      >
        Ask a Question
      </Button>
      <Button
        type="button"
        variant="link"
        sx={{
          letterSpacing: 'wider',
          textTransform: 'uppercase',
          fontSize: 0,
          fontWeight: 500,
        }}
        onClick={() => setCurrentModal('review')}
      >
        Write a Review
      </Button>
    </Flex>
  </Box>
)

export default ReviewTabs
