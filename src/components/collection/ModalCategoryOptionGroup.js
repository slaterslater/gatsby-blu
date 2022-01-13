import { Box, Flex } from 'theme-ui'
import React from 'react'
import Accordion from '../Accordion'
import ThemeLink from '../app/ThemeLink'

const ModalCategoryOptionGroup = ({ title, items }) => (
  <Accordion title={title}>
    {items.map(({ label, param, isSelected, to }) => (
      <Box as="p" pl={4}>
        <ThemeLink
          key={to}
          isSelected={isSelected}
          to={to}
          variant="caps"
          sx={{
            bg: 'white',
            fontSize: 9,
            fontWeight: isSelected ? 'bold' : 'normal',
            letterSpacing: 'widest',
            textTransform: 'lowercase',
            lineHeight: 2.5,
            '&[data-selected]': {
              background: 'white',
              color: 'primary',
            },
          }}
        >
          {label}
        </ThemeLink>
      </Box>
    ))}
  </Accordion>
)

export default ModalCategoryOptionGroup
