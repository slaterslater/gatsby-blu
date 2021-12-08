import React from 'react'
import { Container, Flex, Box, AspectRatio } from 'theme-ui'
import ContentOuter from './ContentOuter'
import ImageLinkCard from './ImageLinkCard'

export const MobileSlider = ({ nodes, minCardWidth, ...props }) => (
  <Box
    {...props}
    sx={{
      width: 'calc(100% + 24px)',
      overflowX: 'auto',
      webkitOverflowScrolling: 'touch',
      scrollSnapType: 'x mandatory',
      scrollBehavior: 'smooth',
      msOverflowStyle: 'none',
      justifyContent: 'center',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      ...(props.sx || {}),
    }}
  >
    <Flex mx={-2} px={5}>
      {nodes.map((node, i) => (
        <Box
          key={`mobile-slider-${i}`}
          mx={2}
          sx={{
            scrollSnapAlign: 'start',
            minWidth: [minCardWidth, 0],
            flex: 1,
          }}
        >
          {node}
        </Box>
      ))}
    </Flex>
  </Box>
)

export const CardRowToSlider = ({ cards, minCardWidth, ...props }) => (
  <MobileSlider
    minCardWidth={minCardWidth}
    nodes={cards.map(card => (
      <ImageLinkCard
        image={card.image}
        path={card.button.path}
        text={card.button.text}
        ratio={3 / 4}
        key={card.id}
        minCardWidth={minCardWidth}
      />
    ))}
  />
)

const CollectionRow = ({ node: { collections } }) => (
  <Container variant="wide">
    <CardRowToSlider cards={collections} minCardWidth={230} />
  </Container>
)

export default CollectionRow
