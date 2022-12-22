import { Button, Link, Box, Flex } from 'theme-ui'
import React, { useState, useContext } from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { ProductContext } from './ProductContext'
import Modal from '../Modal'

const SizingContent = ({ type }) => (
  <Box px={4}>
    {(type === 'ring' || type === 'band') && (
      <>
        <Box sx={{ display: ['block', 'none'] }}>
          <StaticImage
            alt="ring sizing"
            src="../../images/sizing-help/ring-mobile.jpg"
          />
        </Box>
        <Box sx={{ display: ['none', 'block'] }}>
          <StaticImage
            alt="ring sizing"
            src="../../images/sizing-help/ring-desktop.jpg"
          />
        </Box>
        <Flex pt={4} sx={{ justifyContent: 'center' }}>
          <Link variant="button" href="/bluboho-ring-sizer-guide.pdf" download>
            Download Printout
          </Link>
        </Flex>
      </>
    )}
    {type === 'necklace' && (
      <>
        <Box sx={{ display: ['block', 'none'] }}>
          <StaticImage
            alt="necklace sizing"
            src="../../images/sizing-help/necklace-mobile.jpg"
          />
        </Box>
        <Box sx={{ display: ['none', 'block'] }}>
          <StaticImage
            alt="necklace sizing"
            src="../../images/sizing-help/necklace-desktop.jpg"
          />
        </Box>
      </>
    )}
  </Box>
)

const SizingHelp = () => {
  const [open, setOpen] = useState(false)
  const {
    product: { productType },
  } = useContext(ProductContext)

  // match Rings, Necklaces, Bands
  const [sizeType] = productType.match(/(ring|necklace|band)/gi) || []

  return (
    <>
      {sizeType && (
        <>
          <Button
            type="button"
            onClick={() => setOpen(true)}
            variant="link"
            sx={{ fontWeight: '600', fontSize: 0, letterSpacing: 'widest' }}
          >
            sizing help?
          </Button>
          <Modal isOpen={open} setOpen={setOpen}>
            <SizingContent type={sizeType.toLowerCase()} />
          </Modal>
        </>
      )}
    </>
  )
}

export default SizingHelp
