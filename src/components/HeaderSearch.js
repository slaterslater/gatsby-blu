import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useKeyPress from 'react-use-keypress'
import { Box, Grid, Flex, Button } from 'theme-ui'
import PropTypes from 'prop-types'
import { IoIosClose, IoIosSearch } from 'react-icons/io'
import { Configure, InstantSearch, connectHits } from 'react-instantsearch-core'
import ThemeLink from './app/ThemeLink'
import {
  InstantSearchProduct,
  InstantSearchInput,
  HitsCount,
  searchClient,
  ViewMore,
} from './search/shared'
import SuggestedSearches from './search/SuggestedSearches'

const SearchHits = connectHits(({ hits }) =>
  hits.map(hit => (
    <Flex sx={{ justifyContent: 'center' }} key={hit.id}>
      <InstantSearchProduct hit={hit} />
    </Flex>
  ))
)

const MotionBox = motion.create(Box)

const HeaderSearch = ({ isOpen, onClose }) => {
  useKeyPress('Escape', () => {
    if (isOpen) {
      onClose()
    }
  })
  const [usedInput, setUsedInput] = useState(false)
  const [term, setTerm] = useState('')

  return (
    <AnimatePresence>
      {isOpen && (
        <InstantSearch
          searchClient={searchClient}
          onSearchStateChange={({ query }) => setTerm(query)}
          indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}
        >
          <MotionBox
            p={5}
            sx={{
              bg: 'white',
              width: '100vw',
              position: 'absolute',
              borderBottom: '1px solid',
              borderColor: 'border',
            }}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
          >
            <Grid
              sx={{
                gridTemplateColumns: 'max-content 1fr max-content',
                alignItems: 'start',
              }}
            >
              <Box as={IoIosSearch} size={24} color="primary" mt={1} />
              <Box>
                <InstantSearchInput
                  onChange={() => {
                    if (!usedInput) {
                      setUsedInput(true)
                    }
                  }}
                />
                {!usedInput && <SuggestedSearches />}
              </Box>
              <Button
                type="button"
                variant="unset"
                mt={1}
                onClick={() => {
                  onClose()
                  setUsedInput(false)
                }}
              >
                <Box as={IoIosClose} size={24} color="primary" />
              </Button>
            </Grid>
            <Configure hitsPerPage={4} />
            {usedInput && (
              <Box>
                <Flex pt={2} sx={{ justifyContent: 'flex-end' }}>
                  <ThemeLink to={`/search?q=${term}`}>
                    <ViewMore />
                  </ThemeLink>
                </Flex>
                <Grid
                  py={4}
                  sx={{
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 5,
                    transition: 'opacity ease-out .3s',
                  }}
                >
                  {usedInput && <SearchHits />}
                </Grid>
              </Box>
            )}
          </MotionBox>
        </InstantSearch>
      )}
    </AnimatePresence>
  )
}

HeaderSearch.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default HeaderSearch
