import React, { useEffect, useRef } from 'react'
import { Container, Flex, Box } from 'theme-ui'
import ImageLinkCard from './ImageLinkCard'

export const MobileSlider = ({
  nodes,
  minCardWidth,
  gap = 2,
  start = 0,
  ...props
}) => {
  const sliderRef = useRef(null)
  useEffect(() => {
    sliderRef.current.scroll({
      left: start * minCardWidth,
      behavior: 'instant',
    })
    // sliderRef.current.scrollLeft = start * minCardWidth
    // console.log({ ref: sliderRef.current })
  }, [start, minCardWidth])

  return (
    <Box
      ref={sliderRef}
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
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        ...(props.sx || {}),
      }}
    >
      <Flex>
        {nodes.map((node, i) => (
          <Box
            key={`mobile-slider-${i}`}
            mx={gap}
            sx={{
              scrollSnapAlign: 'start',
              // minWidth: [minCardWidth, 0],
              minWidth: minCardWidth,
              flex: 1,
            }}
          >
            {node}
          </Box>
        ))}
      </Flex>
    </Box>
  )
}

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
