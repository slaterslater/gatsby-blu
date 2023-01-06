import { Divider, Box, Text, IconButton, Flex, Link } from 'theme-ui'
import { IoIosClose } from 'react-icons/io'
import React from 'react'
import PropTypes from 'prop-types'
import { Link as GatsbyLink } from 'gatsby'
import { IoChatboxEllipsesOutline } from 'react-icons/io5'
import { CgArrowLongRight } from 'react-icons/cg'
import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi'
import { GiBigDiamondRing } from 'react-icons/gi'

const ServiceDrawer = ({ onClose }) => {
  const isChatReady = !!window.tidioChatApi

  const openTidio = () => {
    onClose()
    if (!isChatReady) return
    window.tidioChatApi.show()
    window.tidioChatApi.open()
  }

  return (
    <Flex
      sx={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        position: 'relative',
        'p a': {
          color: 'primary',
          fontWeight: 'bold',
        },
        '[role="button"]': {
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          fontSize: 1,
          letterSpacing: 'wider',
          borderTop: '1px solid',
          borderColor: 'border',
          svg: { marginLeft: 2, marginRight: 3 },
          paddingTop: 3,
          paddingBottom: 3,
          marginLeft: 5,
          marginRight: 5,
          textDecoration: 'none',
          color: 'primary',
        },
        '[role="button"]:last-child': {
          borderBottom: '1px solid',
          borderColor: 'border',
        },
      }}
    >
      <Flex p={4} sx={{ alignItems: 'center' }}>
        <Text sx={{ fontSize: 3, flex: 1 }}>how can we help you?</Text>
        <IconButton p={0} ml={6} onClick={onClose}>
          <Text as={IoIosClose} size={24} />
        </IconButton>
      </Flex>
      <Divider m={0} />
      <Text as="p" m={5}>
        our styling advisors are delighted to assist you with your orders, style
        advice, gift ideas, and more. please select any of the contact methods
        below to get in touch
      </Text>
      <Box
        role="button"
        aria-label="open chat window"
        onClick={openTidio}
        disabled={!isChatReady}
      >
        <IoChatboxEllipsesOutline size={20} />
        chat online
        <CgArrowLongRight />
      </Box>
      {/* <Link role="button" href="https://wa.me/16472736297">
        <IoLogoWhatsapp size={20} />
        WhatsApp
        <CgArrowLongRight />
      </Link> */}
      <Link role="button" href="tel:+1 647-273-6297">
        <HiOutlinePhone size={20} />
        call us
        <CgArrowLongRight />
      </Link>
      <Link role="button" href="mailto:guestexperience@bluboho.com">
        <HiOutlineMail size={20} />
        email us
        <CgArrowLongRight />
      </Link>
      <Box role="button" as={GatsbyLink} to="/book-a-consultation">
        <GiBigDiamondRing size={20} />
        book a consultation
        <CgArrowLongRight />
      </Box>
      <Text as="p" m={5}>
        for more information on returns, shipping and more, please visit our
        <br />
        <GatsbyLink to="/pages/faq">FAQ & Help section</GatsbyLink>
      </Text>
    </Flex>
  )
}
export default ServiceDrawer

ServiceDrawer.propTypes = {
  onClose: PropTypes.func,
}
