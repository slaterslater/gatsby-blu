import { Box } from 'theme-ui'
import React, { createContext, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import useKeyPress from 'react-use-keypress'
import CartDrawer from './CartDrawer'
import NavigationDrawer from './NavigationDrawer'

const MotionBox = motion(Box)

export const DrawerContext = createContext()

const DrawerOuter = ({ origin, ...props }) => (
  <MotionBox
    initial={{ [origin]: '-100%', boxShadow: 'none' }}
    animate={{ [origin]: 0, boxShadow: '0 0 45px rgba(0,0,0,.2)' }}
    exit={{ [origin]: '-100%', boxShadow: 'none' }}
    transition={{ ease: 'easeOut', delay: 0.1 }}
    sx={{
      bg: 'white',
      top: 0,
      bottom: 0,
      width: 360,
      maxWidth: '90vw',
      position: 'fixed',
      zIndex: 101,
    }}
    {...props}
  />
)

const Drawers = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState('')

  const closeDrawer = () => !!openDrawer && setOpenDrawer('')
  useKeyPress('Escape', closeDrawer)

  return (
    <DrawerContext.Provider value={[openDrawer, setOpenDrawer]}>
      <Box>
        <AnimatePresence>
          {!!openDrawer && (
            <MotionBox
              key="shade"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              sx={{
                boxShadow: 'inset 0 0 70px rgba(0,0,0,.7)',
                bg: 'rgba(0,0,0,.5)',
                height: '100vh',
                width: '100vw',
                position: 'fixed',
                zIndex: 100,
              }}
              onClick={() => setOpenDrawer('')}
            />
          )}
          {openDrawer === 'cart' && (
            <DrawerOuter key="cart-drawer" origin="right">
              <CartDrawer onClose={() => setOpenDrawer('')} />
            </DrawerOuter>
          )}
          {openDrawer === 'navigation' && (
            <DrawerOuter key="navigation-drawer" origin="left">
              <NavigationDrawer onClose={() => setOpenDrawer('')} />
            </DrawerOuter>
          )}
        </AnimatePresence>
        {children}
      </Box>
    </DrawerContext.Provider>
  )
}

export default Drawers
