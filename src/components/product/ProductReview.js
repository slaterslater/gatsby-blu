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

const ProductReview = ({
  name,
  score,
  title,
  content,
  updatedAt,
  images,
  comments,
}) => {
  const starPercentage = (score / 5) * 100

  return (
    <Box>
      <Flex>
        <Box>
          <Avatar />
        </Box>
        <Box sx={{ flex: 1 }} pl={6}>
          <Flex pb={2}>
            <Text mr={4}>{name}</Text>
            <Badge>Verified Buyer</Badge>
            <Text ml="auto">
              <FormattedDate iso={updatedAt} />
            </Text>
          </Flex>
          <Box pb={2}>
            <ReviewStars starPercentage={starPercentage} />
          </Box>
          <Heading>{title}</Heading>
          <Text dangerouslySetInnerHTML={{ __html: content }} />
          {images?.length && (
            <Flex>
              {images.map(image => (
                <Image src={image} key={image} />
              ))}
            </Flex>
          )}
        </Box>
      </Flex>
      {comments?.map(comment => (
        <Flex>
          <Box>
            <Avatar />
          </Box>
          <Box sx={{ flex: 1 }} pl={6}>
            <Flex>
              <Text>{comment.name}</Text>
              <Text ml="auto">
                <FormattedDate iso={comment.updatedAt} />
              </Text>
            </Flex>
            <Text>comment.content</Text>
          </Box>
        </Flex>
      ))}
      <Divider mt={6} />
    </Box>
  )
}

export default ProductReview
