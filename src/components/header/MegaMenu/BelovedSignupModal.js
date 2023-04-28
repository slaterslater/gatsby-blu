import React, { useEffect, useState } from 'react'
import { Heading, Link, Text } from 'theme-ui'
import { GiBigDiamondRing } from 'react-icons/gi'
import BelovedSignupForm from '../../form/BelovedSignupForm'
import Modal from '../../Modal'
import { CalloutBox } from '../../product/ProductCTACallout'

const BelovedSignupModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!success) return
    setTimeout(() => {
      setSuccess(false)
      setIsOpen(false)
    }, 5000)
  }, [success])

  return (
    <>
      <Link
        sx={{ textDecoration: 'none', cursor: 'pointer' }}
        onClick={() => setIsOpen(true)}
      >
        request assistance
      </Link>
      <Modal isOpen={isOpen} setOpen={setIsOpen} width={1100}>
        {success && (
          <CalloutBox
            icon={GiBigDiamondRing}
            title="request submitted!"
            description="thank you for getting in touch! our experts will follow up by email shortly."
            bg="cream"
            sx={{ maxWidth: 380, margin: '0 auto' }}
          />
        )}
        {!success && (
          <>
            <Heading
              as="h2"
              variant="h2"
              sx={{ textAlign: 'center' }}
              pt={[5, 1]}
            >
              get in touch
            </Heading>
            <Text
              as="p"
              variant="copy"
              sx={{ textAlign: 'center', maxWidth: 420 }}
              pt={6}
              mx="auto"
            >
              request assistance from our beloved by bluboho experts— let us
              know how we can help, and we'll follow up with the answers to your
              questions.
            </Text>
            <BelovedSignupForm onSuccess={() => setSuccess(true)} withMessage />
          </>
        )}
      </Modal>
    </>
  )
}

export default BelovedSignupModal
