import React from 'react'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { Button, Flex } from 'theme-ui'
import { IoClose } from 'react-icons/io5'

const MotionDialogOverlay = motion.create(DialogOverlay)
const MotionDialogContent = motion.create(DialogContent)
const MotionFlex = motion.create(Flex)

const Modal = ({
  isOpen,
  setOpen,
  width = 660,
  minHeight = true,
  children,
}) => {
  const handleDismiss = () => setOpen(false)

  return (
    <AnimatePresence>
      <MotionDialogOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        isOpen={isOpen}
        onDismiss={handleDismiss}
        style={{
          zIndex: 110,
          background: 'backgroundShade',
        }}
      >
        <MotionFlex
          as={MotionDialogContent}
          initial={{ y: '5px', opacity: 0 }}
          animate={{ y: '0', opacity: 1 }}
          exit={{ y: '20px', opacity: 0 }}
          transition={{ min: 0, max: 100, bounceDamping: 9, delay: 0.2 }}
          aria-label="popup"
          m={[0, '10vh auto']}
          mt={['70px', '10vh']}
          p={[4, 5, 6]}
          sx={{
            borderRadius: '3px',
            width,
            minHeight: [minHeight ? 'calc(100% - 70px)' : 0, 0],
            maxWidth: ['100%', '90vw'],
            flexDirection: 'column'
          }}
        >
          <Button
            type="button"
            variant="link"
            onClick={handleDismiss}
            title="close"
            ml="auto"
          >
            <IoClose />
          </Button>
          {children}
        </MotionFlex>
      </MotionDialogOverlay>
    </AnimatePresence>
  )
}

Modal.defaultProps = {
  isOpen: false,
  setOpen: () => {},
  children: false,
}

export default Modal
