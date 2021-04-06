import React from 'react'
import {
  Badge,
  Avatar,
  Box,
  Heading,
  Flex,
  Text,
  Image,
  Divider,
} from 'theme-ui'
import { ReviewStars } from './ProductReviewsTopline'
import FormattedDate from '../FormattedDate'
import YotpoPost from './YotpoPost'

const ProductReview = ({
  user,
  score,
  title,
  content,
  createdAt,
  imagesData,
  comment,
}) => {
  const starPercentage = (score / 5) * 100

  return (
    <Box>
      <YotpoPost
        avatar={user.socialImage}
        displayName={user.displayName}
        badge="verified buyer"
        date={createdAt}
        starPercentage={starPercentage}
        title={title}
        content={content}
      >
        {imagesData?.length && (
          <Flex pt={4}>
            {imagesData.map(image => (
              <Image
                mr={3}
                sx={{ height: 100, width: 100 }}
                src={image.thumbUrl}
                key={image.thumbUrl}
              />
            ))}
          </Flex>
        )}
      </YotpoPost>
      {!!comment && (
        <Box pl={5} pt={5}>
          <Box sx={{ borderLeft: '2px solid', borderColor: 'border' }} pl={5}>
            <YotpoPost
              displayName="Store Owner"
              date={comment.createdAt}
              content={comment.content}
            />
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default ProductReview
