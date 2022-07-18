import React from 'react'
import { Button } from 'theme-ui'
import { motion } from 'framer-motion'

const VariantOption = ({ isSelected, isHidden = false, ...props }) => (
  <Button
    type="button"
    variant="secondary"
    whileHover={{ scale: 1.05 }}
    px={1}
    sx={{
      border: '1px solid',
      borderColor: isHidden ? 'white' : isSelected ? 'black' : 'cream',
      bg: isHidden ? 'white' : isSelected ? 'cream' : 'prodBackground',
      color: isHidden ? 'white' : 'primary',
      cursor: isHidden ? 'auto' : 'pointer',
      userSelect: isHidden ? 'none' : 'auto',
      outline: 'none',
      flex: '1 1 auto',
    }}
    {...props}
  />
)

export default VariantOption
