import { Button } from 'theme-ui'
import React, { useContext } from 'react'
import { DrawerContext } from '../drawers'
import { usePageContext } from '../../contexts/PageContext'

const ServiceButton = () => {
  const { openDrawer, setOpenDrawer } = useContext(DrawerContext)
  const { isBeloved } = usePageContext()

  return (
    <Button
      type="button"
      variant={isBeloved ? 'outline' : 'inverted'}
      // variant="inverted"
      // bg={isBeloved ? 'roseGold' : 'cream'}
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
