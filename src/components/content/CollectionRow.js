import React from 'react'
import { Container, Flex, Box, AspectRatio } from 'theme-ui'
import ContentOuter from './ContentOuter'
import ImageLinkCard from './ImageLinkCard'

const CardRowToSlider = ({ cards, minCardWidth, ...props }) => (
  <Box
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
          mx={2}
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
  <Container variant="wide">
    <CardRowToSlider cards={collections} minCardWidth={230} />
  </Container>
)

export default CollectionRow
