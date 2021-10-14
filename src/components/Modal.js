import React from 'react'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { Box, useThemeUI, Button } from 'theme-ui'

const MotionDialogOverlay = motion(DialogOverlay)
const MotionDialogContent = motion(DialogContent)
const MotionBox = motion(Box)

const Modal = ({ isOpen, setOpen, width = 660, children }) => {
  const handleDismiss = () => setOpen(false)
  const {
    theme: {
      colors: { backgroundShade },
    },
  } = useThemeUI()
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
            background: backgroundShade,
          }}
        >
          <MotionBox
            as={MotionDialogContent}
            initial={{ y: '5px', opacity: 0 }}
            animate={{ y: '0', opacity: 1 }}
            exit={{ y: '20px', opacity: 0 }}
            transition={{ min: 0, max: 100, bounceDamping: 9, delay: '200ms' }}
            aria-label="Sidebar menu"
            m={[0, '10vh auto']}
            mt={['70px', '10vh']}
            p={[4, 5, 6]}
            sx={{
              borderRadius: '3px',
              width,
              minHeight: ['calc(100% - 70px)', 0],
              maxWidth: ['100%', '90vw'],
            }}
          >
            <Button
              type="button"
              variant="link"
              onClick={handleDismiss}
              sx={{
                position: 'absolute',
                top: 24,
                right: 24,
                textTransform: 'uppercase',
                fontSize: 0,
                fontWeight: 600,
                letterSpacing: 'wider',
                transform: ['translateY(-64px)'],
              }}
            >
              done
            </Button>
            {children}
          </MotionBox>
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
