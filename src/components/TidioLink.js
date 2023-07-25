import React, { useEffect, useState } from 'react'
import { IoChatboxEllipsesSharp } from 'react-icons/io5'
import { Box } from 'theme-ui'

const TidioLink = () => {
  const [isAvailable, setAvailable] = useState(false)
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    const onTidioChatApiReady = () => {
      setAvailable(true)
      window.tidioChatApi.hide()
      window.tidioChatApi.on('close', function () {
        window.tidioChatApi.hide()
        setOpen(false)
      })
    }

    if (window.tidioChatApi) {
      window.tidioChatApi.on('ready', onTidioChatApiReady)
      window.removeEventListener('tidioChat-ready', onTidioChatApiReady)
    } else {
      window.addEventListener('tidioChat-ready', onTidioChatApiReady)
    }
  }, [])

  useEffect(() => {
    if (!isAvailable) return
    const iframe = document.querySelector('#tidio-chat')
    iframe.style.cssText = `
      position: fixed; 
      z-index: 11;
    `
    if (isOpen) {
      window.tidioChatApi.show()
      window.tidioChatApi.open()
      // iframe.style.display = 'block'
    } else {
      window.tidioChatApi?.close()
      // iframe.style.display = 'none'
    }
  }, [isAvailable, isOpen])

  return (
    <Box
      role="button"
      aria-label="open chat window"
      aria-pressed={isOpen}
      onClick={() => setOpen(prev => !prev)}
      disabled={isAvailable}
      sx={{
        // display: isAvailable ? 'flex' : 'none',
        display: 'none',
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        width: 48,
        bg: 'primary',
        position: 'fixed',
        zIndex: 11,
        bottom: 16,
        borderRadius: '50%',
        right: 16,
        color: '#fff',
      }}
    >
      <IoChatboxEllipsesSharp size={24} />
    </Box>
  )
}

export default TidioLink
