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
  user,
  score,
  title,
  content,
  createdAt,
  imagesData,
  comments,
}) => {
  const starPercentage = (score / 5) * 100

  return (
    <Box>
      <Flex>
        <Box>
          <Avatar src={user.socialImage} />
        </Box>
        <Box sx={{ flex: 1 }} pl={6}>
          <Flex pb={2}>
            <Text mr={4}>{user.displayName}</Text>
            <Badge>Verified Buyer</Badge>
            <Text ml="auto">
              <FormattedDate iso={createdAt} />
            </Text>
          </Flex>
          <Box pb={2}>
            <ReviewStars starPercentage={starPercentage} />
          </Box>
          <Heading>{title}</Heading>
          <Text dangerouslySetInnerHTML={{ __html: content }} />
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
