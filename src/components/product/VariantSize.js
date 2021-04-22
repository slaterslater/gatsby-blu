import React from 'react'
import { Button } from 'theme-ui'

const VariantSize = ({ value, isSelected, onClick }) => (
  <Button variant="outline" type="button" onClick={onClick}>
    {value}
  </Button>
)

export default VariantSize
