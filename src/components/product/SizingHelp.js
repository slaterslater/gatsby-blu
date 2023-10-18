import { Button, Box } from 'theme-ui'
import React, { useState, useContext } from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { ProductContext } from './ProductContext'
import Modal from '../Modal'

const SizingContent = ({ type }) => (
  <Box
    px={4}
    sx={{
      '.mobile': { display: ['block', 'none'] },
      '.deskTop': { display: ['none', 'block'] },
    }}
  >
    {/* {(type === 'ring' || type === 'band') && (
      <>
        <StaticImage
          className="mobile"
          alt="ring sizing"
          src="../../images/sizing-help/ring-mobile.jpg"
        />
        <StaticImage
          className="desktop"
          alt="ring sizing"
          src="../../images/sizing-help/ring-desktop.jpg"
        />
        <Flex pt={4} sx={{ justifyContent: 'center' }}>
          <Link variant="button" href="/find-your-ring-size.pdf" download>
            Download Printout
          </Link>
        </Flex>
      </>
    )} */}
    {type === 'necklace' && (
      <>
        <StaticImage
          className="mobile"
          alt="necklace sizing"
          src="../../images/sizing-help/necklace-mobile.jpg"
        />
        <StaticImage
          className="desktop"
          alt="necklace sizing"
          src="../../images/sizing-help/necklace-desktop.jpg"
        />
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
  const type = sizeType?.toLowerCase() || ''
  const isRing = type === 'ring' || type === 'band'

  // ring only has pdf so open in new tab
  const handleClick = () => {
    if (isRing) {
      window.open('/find-your-ring-size.pdf', '_blank')
    } else {
      setOpen(true)
    }
  }

  if (!sizeType) return null

  return (
    <>
      <Button
        type="button"
        onClick={handleClick}
        variant="link"
        sx={{ fontWeight: '600', fontSize: 0, letterSpacing: 'widest' }}
      >
        sizing help?
      </Button>
      <Modal isOpen={open} setOpen={setOpen}>
        <SizingContent type={type} />
      </Modal>
    </>
  )
}

export default SizingHelp
