import { Heading, Box, Flex, Text, Badge, Image } from 'theme-ui'
import React from 'react'
import FormattedDate from '../FormattedDate'
import { ReviewStars } from './ProductReviewsTopline'

const YotpoPost = ({
  avatar,
  displayName,
  children,
  starPercentage,
  content,
}) => (
  <Flex px={[0, 6, 9]}>
    {avatar && (
      <Box sx={{ width: 130, height: 130 }} mr={5}>
        <Image src={avatar} />
      </Box>
    )}
    <Box sx={{ flex: 1 }}>
      <Flex pb={2} sx={{ flexWrap: 'wrap', alignItems: 'center' }}>
        <Text mr={[2]}>{displayName}</Text>
        {starPercentage && (
          <Box>
            <ReviewStars starPercentage={starPercentage} />
          </Box>
        )}
      </Flex>
      <Text
        sx={{ maxWidth: '70ch', lineHeight: 2.5 }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      {children}
    </Box>
  </Flex>
)

export default YotpoPost
