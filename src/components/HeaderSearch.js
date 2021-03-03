import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Box, Grid, Button, Input, Text } from 'theme-ui'
import PropTypes from 'prop-types'
import { IoIosClose, IoIosSearch } from 'react-icons/io'
import SearchPreview from './SearchPreview'

const AnimatedBox = motion.custom(Box)

const HeaderSearch = ({ isOpen, onClose }) => {
  const [value, setValue] = useState('')

  return (
    <AnimatePresence>
      {isOpen && (
        <AnimatedBox
          p={5}
          sx={{ bg: 'white', width: '100%', position: 'absolute' }}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
        >
          <Grid
            sx={{
              gridTemplateColumns: 'max-content 1fr max-content',
              alignItems: 'center',
            }}
          >
            <Box as={IoIosSearch} size={24} color="primary" />
            <Box>
              <Input
                type="input"
                onChange={e => setValue(e.target.value)}
                value={value}
                sx={{
                  letterSpacing: 'caps',
                  border: 'none',
                  fontFamily: 'body',
                  textTransform: 'uppercase',
                  fontSize: 3,
                }}
              />
            </Box>
            <Button type="button" variant="unset" onClick={onClose}>
              <Box as={IoIosClose} size={24} color="primary" />
            </Button>
          </Grid>
          <SearchPreview term={value} />
        </AnimatedBox>
      )}
    </AnimatePresence>
  )
}

HeaderSearch.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default HeaderSearch
