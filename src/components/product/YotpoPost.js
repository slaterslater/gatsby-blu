import { Heading, Box, Flex, Text, Badge, Avatar } from 'theme-ui'
import React from 'react'
import FormattedDate from '../FormattedDate'
import { ReviewStars } from './ProductReviewsTopline'

const YotpoPost = ({
  avatar,
  displayName,
  badge,
  date,
  children,
  starPercentage,
  content,
  title,
}) => (
  <Flex>
    <Box mr={5}>
      <Avatar src={avatar} sx={{ height: 42, width: 42 }} />
    </Box>
    <Box sx={{ flex: 1 }}>
      <Flex pb={2} sx={{ flexWrap: 'wrap', alignItems: 'center' }}>
        <Text mr={[2, 4]}>{displayName}</Text>
        <Box mr="auto">{badge && <Badge>{badge}</Badge>}</Box>
        <Text>
          <FormattedDate iso={date} />
        </Text>
      </Flex>
      {starPercentage && (
        <Box pb={2}>
          <ReviewStars starPercentage={starPercentage} />
        </Box>
      )}
      {title && <Heading>{title}</Heading>}
      <Text dangerouslySetInnerHTML={{ __html: content }} />
      {children}
    </Box>
  </Flex>
)

export default YotpoPost
