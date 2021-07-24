import React from 'react'
import { Flex, Box, AspectRatio } from 'theme-ui'
import ContentOuter from './ContentOuter'
import ImageLinkCard from './ImageLinkCard'

const CardRowToSlider = ({ cards, minCardWidth, ...props }) => (
  <Box
    px={[0, 4]}
    mx="auto"
    {...props}
    sx={{
      width: '100%',
      overflowX: 'auto',
      webkitOverflowScrolling: 'touch',
      scrollSnapType: 'x mandatory',
      scrollBehavior: 'smooth',
      msOverflowStyle: 'none',
      justifyContent: 'center',
      scrollbarWidth: 'none',
      '&::webkit-scrollbar': {
        display: 'none',
      },
      ...(props.sx || {}),
    }}
  >
    <Flex mx={-2}>
      {cards.map(card => (
        <ImageLinkCard
          image={card.image}
          path={card.button.path}
          text={card.button.text}
          ratio={3 / 4}
          key={card.id}
          px={2}
          sx={{
            scrollSnapAlign: 'start',
            minWidth: [minCardWidth, 0],
            flex: 1,
          }}
        />
      ))}
    </Flex>
  </Box>
)

const CollectionRow = ({ node: { collections } }) => (
  <CardRowToSlider cards={collections} minCardWidth={230} pb={[7, 8]} />
)

export default CollectionRow
