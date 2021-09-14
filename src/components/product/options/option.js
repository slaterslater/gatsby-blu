import React from 'react'
import { Button } from 'theme-ui'
import { motion } from 'framer-motion'

const MotionButton = motion(Button)

const VariantOption = ({ isSelected, ...props }) => (
  <MotionButton
    type="button"
    variant="secondary"
    whileHover={{ scale: 1.05 }}
    px={1}
    sx={{
      bg: isSelected ? 'lightBlueGray' : 'lightGray',
      border: '1px solid',
      borderColor: isSelected ? 'darkerGray' : 'lightGray',
      outline: 'none',
      flex: '1 1 auto',
    }}
    {...props}
  />
)

export default VariantOption
