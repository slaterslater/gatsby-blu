import { Box, Flex, Text, Badge, Avatar } from 'theme-ui'
import React from 'react'
import YotpoPost from './YotpoPost'

const ProductQuestion = ({
  content,
  asker,
  createdAt,
  sortedPublicAnswers,
}) => (
  <Box>
    <YotpoPost
      avatar={asker.socialImage}
      displayName={asker.displayName}
      date={createdAt}
      content={content}
    />
    <Box pl={5} pt={5}>
      {sortedPublicAnswers.map(answer => (
        <Box sx={{ borderLeft: '2px solid', borderColor: 'border' }} pl={5}>
          <YotpoPost
            avatar={answer.answerer.socialImage}
            displayName="Store Owner"
            date={answer.createdAt}
            content={answer.content}
          />
        </Box>
      ))}
    </Box>
  </Box>
)

export default ProductQuestion
