import React from 'react'
import { Button } from 'theme-ui'
import { motion } from 'framer-motion'

const VariantOption = ({ isSelected, ...props }) => (
  <Button
    type="button"
    variant="secondary"
    whileHover={{ scale: 1.05 }}
    px={1}
    sx={{
      border: '1px solid',
      borderColor: isSelected ? 'black' : 'border',
      outline: 'none',
      flex: '1 1 auto',
    }}
    {...props}
  />
)

export default VariantOption
