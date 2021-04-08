import React from 'react'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import { AnimatePresence, motion } from 'framer-motion'

const MotionDialogOverlay = motion(DialogOverlay)
const MotionDialogContent = motion(DialogContent)

const Modal = ({ isOpen, setOpen, children }) => {
  const handleDismiss = () => setOpen(false)
  return (
    <AnimatePresence>
      {isOpen && (
        <MotionDialogOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onDismiss={handleDismiss}
          style={{
            zIndex: 11,
            boxShadow: 'inset 0 0 70px rgba(0,0,0,.3)',
            background: 'rgba(0,0,0,.5)',
          }}
        >
          <MotionDialogContent
            initial={{ y: '5px', opacity: 0 }}
            animate={{ y: '0', opacity: 1 }}
            exit={{ y: '20px', opacity: 0 }}
            transition={{ min: 0, max: 100, bounceDamping: 9, delay: '200ms' }}
            aria-label="Sidebar menu"
            style={{
              boxShadow: '0 0 48px rgba(0,0,0,.3)',
              borderRadius: '3px',
            }}
          >
            {children}
          </MotionDialogContent>
        </MotionDialogOverlay>
      )}
    </AnimatePresence>
  )
}

Modal.defaultProps = {
  isOpen: false,
  setOpen: () => {},
  children: false,
}

export default Modal
