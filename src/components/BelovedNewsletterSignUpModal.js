import { AnimatePresence, motion } from 'framer-motion'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import React, { useContext, useRef, useState } from 'react'
import { Box, Button, Link } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { useTimeout } from '../lib/useTimeout'
import { NewsletterContext } from '../contexts/NewsletterContext'

const MotionDialogOverlay = motion(DialogOverlay)
const MotionDialogContent = motion(DialogContent)
const MotionBox = motion(Box)

const BelovedNewsletterSignUpModal = () => {
  const [isOn, setOn] = useState(false)
  const { dismissBelovedPrompt, shouldPromptBeloved } =
    useContext(NewsletterContext)
  const text = useRef(null)

  useTimeout(() => {
    if (!shouldPromptBeloved) return
    setOn(true)
  }, 4500)

  const handleDismiss = () => {
    dismissBelovedPrompt()
    setOn(false)
  }

  const URL = '/beloved/newsletter-signup'

  return (
    <AnimatePresence>
      {isOn && shouldPromptBeloved && (
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
            mt={['60px', '10vh']}
            mx="auto"
            sx={{
              width: 660,
              maxWidth: ['100%', '90vw'],
              background: 'transparent',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              flexDirection: 'column',
              '.offScreen': { position: 'absolute', left: '-9999em' },
            }}
          >
            <Link as={GatsbyLink} to={URL} className="offScreen">
              join our list to get exclusive access
            </Link>
            <Button
              type="button"
              variant="link"
              onClick={handleDismiss}
              sx={{
                color: 'cream',
                alignSelf: 'flex-end',
                textTransform: 'uppercase',
                fontSize: 0,
                fontWeight: 600,
                letterSpacing: 'wider',
                // transform: ['translateY(20px)', 'translateY(25px)'],
              }}
              mr={[6, 8]}
            >
              close
            </Button>
            <GatsbyLink to={URL}>
              <StaticImage
                src="../images/popup/beloved-homepage-pop-up.webp"
                alt=""
              />
            </GatsbyLink>
          </MotionBox>
        </MotionDialogOverlay>
      )}
    </AnimatePresence>
  )
}

export default BelovedNewsletterSignUpModal
