import { AnimatePresence, motion } from 'framer-motion'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import React, { useContext, useRef, useState } from 'react'
import { Box, Button, Flex, IconButton, Image, Text, Link } from 'theme-ui'
import { IoIosClose } from 'react-icons/io'
import { StaticImage } from 'gatsby-plugin-image'
import { Link as GatsbyLink } from 'gatsby'
import { useTimeout } from '../lib/useTimeout'
import { NewsletterContext } from '../contexts/NewsletterContext'

const MotionDialogOverlay = motion(DialogOverlay)
const MotionDialogContent = motion(DialogContent)
const MotionBox = motion(Box)

const NewsletterSignUpModal = () => {
  const [isOn, setOn] = useState(false)
  const { dismissPrompt, shouldPrompt } = useContext(NewsletterContext)
  const text = useRef(null)

  useTimeout(() => {
    if (shouldPrompt) {
      setOn(true)
      console.log(text.current)
    }
  }, 1000)

  const handleDismiss = () => {
    dismissPrompt()
    setOn(false)
  }

  return (
    <AnimatePresence>
      {isOn && shouldPrompt && (
        <MotionDialogOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onDismiss={handleDismiss}
          style={{
            zIndex: 11,
            background: 'backgroundShade',
          }}
        >
          <MotionBox
            as={MotionDialogContent}
            ref={text}
            initial={{ y: '5px', opacity: 0 }}
            animate={{ y: '0', opacity: 1 }}
            exit={{ y: '20px', opacity: 0 }}
            transition={{ min: 0, max: 100, bounceDamping: 9, delay: '200ms' }}
            aria-label="newsletter signup"
            m={[0, '10vh auto']}
            mt={['150px', '10vh']}
            p={[4, 5, 6]}
            sx={{
              borderRadius: '3px',
              width: 660,
              maxWidth: ['100%', '90vw'],
              background: 'transparent',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              '.offScreen': { position: 'absolute', left: '-9999em' },
            }}
          >
            <Link as={GatsbyLink} to="/sample-sale" className="offScreen">
              sign up because the last time we did this it sold out in 2 weeks
            </Link>
            <Button
              type="button"
              variant="link"
              onClick={handleDismiss}
              sx={{
                alignSelf: 'flex-end',
                textTransform: 'uppercase',
                fontSize: 0,
                fontWeight: 600,
                letterSpacing: 'wider',
                transform: ['translateY(20px)', 'translateY(25px)'],
              }}
              mr={[6, 8]}
            >
              close
            </Button>
            <Image src="/homepage-pop-up-2022-june-01-01.png" alt="" />
            <Link
              as={GatsbyLink}
              to="/sample-sale"
              sx={{
                width: 150,
                height: 50,
                transform: [
                  'translateY(-100px)',
                  'translateY(-135px)',
                  'translateY(-135px)',
                ],
              }}
            >
              <Text className="offScreen">sign up</Text>
            </Link>
          </MotionBox>
        </MotionDialogOverlay>
      )}
    </AnimatePresence>
    // <AnimatePresence>
    //   {isOn && (
    //     <MotionDialogOverlay
    //       initial={{ opacity: 0 }}
    //       animate={{ opacity: 1 }}
    //       exit={{ opacity: 0 }}
    //       onDismiss={handleDismiss}
    //       style={{
    //         zIndex: 11,
    //         background: 'transparent',
    //       }}
    //     >
    //       <MotionBox
    //         as={MotionDialogContent}
    //         initial={{ y: '5px', opacity: 0 }}
    //         animate={{ y: '0', opacity: 1 }}
    //         exit={{ y: '20px', opacity: 0 }}
    //         transition={{ min: 0, max: 100, bounceDamping: 9, delay: '200ms' }}
    //         aria-label="Sidebar menu"
    //         m={[0, '10vh auto']}
    //         mt={['70px', '10vh']}
    //         p={[4, 5, 6]}
    //         sx={{
    //           borderRadius: '3px',
    //           width: 660,
    //           // minHeight: [minHeight ? 'calc(100% - 70px)' : 0, 0],
    //           maxWidth: ['100%', '90vw'],
    //           bg: 'none',
    //         }}
    //       >
    //         <Button
    //           type="button"
    //           variant="link"
    //           onClick={handleDismiss}
    //           sx={{
    //             position: 'absolute',
    //             top: 24,
    //             right: 24,
    //             textTransform: 'uppercase',
    //             fontSize: 0,
    //             fontWeight: 600,
    //             letterSpacing: 'wider',
    //             transform: ['translateY(-64px)'],
    //           }}
    //         >
    //           done
    //         </Button>
    //         <Flex sx={{ justifyContent: 'center', alignContent: 'center' }}>
    //           <Image src="/homepage-pop-up-2022-june-01-01.png" alt="" />
    //         </Flex>
    //       </MotionBox>
    //     </MotionDialogOverlay>
    //   )}
    // </AnimatePresence>
    // <AnimatePresence>
    //   {isOn && (
    //     <MotionBox
    //       initial={{ y: '20%', opacity: 0 }}
    //       animate={{ y: 0, opacity: 1 }}
    //       exit={{ y: '20%', opacity: 0 }}
    //       transition={{ ease: 'easeInOut', duration: 0.3 }}
    //       p={3}
    //       px={7}
    //       sx={{
    //         display: 'flex',
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //         flexWrap: ['wrap', 'wrap', 'nowrap'],
    //         bg: 'cream',
    //         zIndex: 10,
    //         position: 'fixed',
    //         left: 0,
    //         right: 0,
    //         bottom: 0,
    //         gap: [2, 2, 6],
    //         pb: [6, 0],
    //       }}
    //     >
    //       <Text>image goes here</Text>
    //       <IconButton
    //         type="button"
    //         onClick={() => {
    //           dismissPrompt()
    //           setOn(false)
    //         }}
    //         sx={{
    //           position: 'absolute',
    //           left: '12px',
    //           bottom: '50%',
    //           transform: 'translateY(50%)',
    //         }}
    //       >
    //         <Text as={IoIosClose} sx={{ color: 'black', fontSize: 8 }} />
    //       </IconButton>
    //     </MotionBox>
    //   )}
    // </AnimatePresence>
  )
}

export default NewsletterSignUpModal
