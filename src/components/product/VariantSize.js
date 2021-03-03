import React from 'react'
import { Button } from 'theme-ui'

const VariantSize = ({ value, isSelected, onClick }) => (
  <Button
    variant="secondary"
    sx={{
      bg: 'lightBlueGray',
      borderColor: isSelected ? 'primary' : 'lightBlueGray',
    }}
    type="button"
    onClick={onClick}
  >
    {value}
  </Button>
)

export default VariantSize
