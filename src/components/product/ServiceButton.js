import { Button } from 'theme-ui'
import React, { useContext } from 'react'
import { DrawerContext } from '../drawers'

const ServiceButton = () => {
  const { openDrawer, setOpenDrawer } = useContext(DrawerContext)
  return (
    <Button
      type="button"
      variant="inverted"
      disabled={!!openDrawer}
      onClick={() => {
        setOpenDrawer('service')
      }}
      sx={{ flex: 1, fontSize: 0, py: 3, letterSpacing: 'widest' }}
    >
      need some help?
    </Button>
  )
}

export default ServiceButton
