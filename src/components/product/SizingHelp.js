import { Button, Link, Box, Flex } from 'theme-ui'
import React, { useState, useContext } from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { ProductContext } from './ProductContext'
import Modal from '../Modal'

const productTypesWithSizingHelp = ['Ring', 'Necklace']

const SizingContent = ({ type }) => (
  <Box px={4}>
    {type === 'Ring' && (
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
          <Link
            variant="button"
            href="/static/bluboho-ring-sizer-guide.pdf"
            download
          >
            Download Printout
          </Link>
        </Flex>
      </>
    )}
    {type === 'Necklace' && (
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

  const hasSizingHelp = productTypesWithSizingHelp.includes(productType)

  return (
    <>
      {hasSizingHelp && (
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
            <SizingContent type={productType} />
          </Modal>
        </>
      )}
    </>
  )
}

export default SizingHelp
