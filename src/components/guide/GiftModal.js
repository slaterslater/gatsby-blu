import React from 'react'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { Box, useThemeUI, Button, Flex } from 'theme-ui'

const MotionDialogOverlay = motion(DialogOverlay)
const MotionDialogContent = motion(DialogContent)
const MotionBox = motion(Box)

const GiftModal = ({ justifyContent, isOpen, setOpen, children }) => {
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
            // background: backgroundShade,
          }}
        >
          <Flex
            sx={{ width: '100%', maxWidth: 985, justifyContent }}
            px={[0, 5]}
            mx="auto"
          >
            <MotionBox
              as={MotionDialogContent}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              // initial={{ y: '5px', opacity: 0 }}
              // animate={{ y: '0', opacity: 1 }}
              // exit={{ y: '20px', opacity: 0 }}
              transition={{
                min: 0,
                max: 100,
                bounceDamping: 9,
                delay: '200ms',
              }}
              aria-label="Sidebar menu"
              // m={[0, '10vh auto']}
              // mt={['70px', '10vh']}
              // p={[4, 5, 6]}
              sx={{
                borderRadius: '3px',
                // 2D0 add breakpoints/ maxWidth
                // width: 400,
                minHeight: 420,
                // minHeight: ['calc(100% - 70px)', 0],
                width: ['100%', '60%'],
                // maxWidth: ['100%', '90vw'],
                marginTop: [0, 115],
              }}
            >
              <Button
                type="button"
                variant="link"
                onClick={handleDismiss}
                sx={{
                  // position: 'absolute',
                  // top: 24,
                  // right: 24,
                  textTransform: 'uppercase',
                  fontSize: 0,
                  fontWeight: 600,
                  letterSpacing: 'wider',
                  // transform: ['translateY(-64px)'],
                }}
              >
                done
              </Button>
              {children}
            </MotionBox>
          </Flex>
        </MotionDialogOverlay>
      )}
    </AnimatePresence>
  )
}

GiftModal.defaultProps = {
  isOpen: false,
  setOpen: () => {},
  children: false,
}

export default GiftModal
