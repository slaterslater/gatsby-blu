import React, { useEffect, useState } from 'react'
import { Link } from 'theme-ui'
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
      // }, 5000)
    }, 2800)
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
        {!success && <BelovedSignupForm onSuccess={() => setSuccess(true)} />}
      </Modal>
    </>
  )
}

export default BelovedSignupModal
