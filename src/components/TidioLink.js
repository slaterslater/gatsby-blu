import React, { useEffect, useState } from 'react'
import { IoChatboxEllipsesSharp } from 'react-icons/io5'
import { Flex, Box } from 'theme-ui'

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
    <Flex
      role="button"
      aria-pressed={isOpen}
      onClick={() => setOpen(prev => !prev)}
      disabled={isAvailable}
      sx={{
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
      <Box as={IoChatboxEllipsesSharp} size={24} />
    </Flex>
  )
}

export default TidioLink
