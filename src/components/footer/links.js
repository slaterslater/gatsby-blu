import React, { useEffect, useState } from 'react'
import { Link, Text } from 'theme-ui'
import { motion } from 'framer-motion'
import ThemeLink from '../app/ThemeLink'

export const FooterA = props => (
  <Link
    variant="small"
    sx={{ display: 'block', color: 'white' }}
    pb={4}
    {...props}
  />
)

export const FooterLink = props => (
  <ThemeLink
    variant="small"
    sx={{ display: 'block', color: 'white' }}
    pb={4}
    {...props}
  />
)

export const FooterText = ({ children, sx, ...props }) => (
  <Text
    sx={{
      fontSize: 0,
      letterSpacing: 'wider',
      display: 'block',
      color: 'white',
      lineHeight: 'normal',
      ...(sx || {}),
    }}
    pb={4}
    {...props}
  >
    {children}
  </Text>
)

export const FooterTidioLink = ({}) => {
  const [isAvailable, setAvailable] = useState(false)
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    const onTidioChatApiReady = () => {
      setAvailable(true)
      window.tidioChatApi.hide()
      window.tidioChatApi.on('close', function () {
        window.tidioChatApi.hide()
      })
    }

    if (window.tidioChatApi) {
      window.tidioChatApi.on('ready', onTidioChatApiReady)
    } else {
      document.addEventListener('tidioChat-ready', onTidioChatApiReady)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      window.tidioChatApi.show()
      window.tidioChatApi.open()
    } else {
      window.tidioChatApi?.close()
    }
  }, [isOpen])

  return (
    <FooterText
      role="button"
      aria-pressed={isOpen}
      onClick={() => setOpen(prev => !prev)}
      disabled={isAvailable}
      sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 2 }}
    >
      <motion.div
        style={{
          height: 10,
          width: 10,
          borderRadius: '50%',
          backgroundColor: '#fff',
          opacity: 0.3,
        }}
        transition={{ ease: 'easeInOut', duration: 2, repeat: Infinity }}
        animate={
          isAvailable
            ? {
                scale: [0.8, 1, 0.8],
                opacity: [0.3, 1, 0.3],
              }
            : {}
        }
      />
      live chat
    </FooterText>
  )
}
