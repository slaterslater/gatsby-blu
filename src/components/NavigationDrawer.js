import { Divider, Link, Box, Text, IconButton, Flex, Input } from 'theme-ui'
import { IoIosClose } from 'react-icons/io'
import { BiSearchAlt2 } from 'react-icons/bi'
import { graphql, Link as GatsbyLink, navigate, useStaticQuery } from 'gatsby'
import React, { useRef } from 'react'
import Accordion from './Accordion'

const NavGroup = ({ menu, closeDrawer, children }) => (
  <Accordion title={children}>
    {menu.subGroup.map(item => (
      <Box key={`drawer-box-${item.title}`} ml={4}>
        <Box mt={1} py={4}>
          <Text sx={{ fontSize: 0, fontWeight: 'heading' }}>{item.title}</Text>
        </Box>
        {item.links.map(link => (
          <Box key={`drawer-${link.path}-${link.text}`} pb={2}>
            <Link
              variant="small"
              as={GatsbyLink}
              to={link.path}
              onClick={closeDrawer}
              sx={{ textDecoration: 'none', fontSize: 0 }}
            >
              {link.text}
            </Link>
          </Box>
        ))}
      </Box>
    ))}
  </Accordion>
)

const NavigationDrawer = ({ onClose }) => {
  const data = useStaticQuery(graphql`
    {
      allSanityMegaMenu {
        nodes {
          groups {
            title
            subGroup {
              title
              links {
                text
                path
              }
            }
          }
        }
      }
    }
  `)

  const closeDrawer = () => onClose()
  const searchInput = useRef(null)
  const megaMenu = data.allSanityMegaMenu.nodes[0].groups
  const miniMenu = [
    {
      title: 'Account',
      path: '/account',
    },
    {
      title: 'Wishlist',
      path: '/account/wishlist',
    },
  ]

  return (
    <Flex
      sx={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        position: 'relative',
      }}
    >
      <Flex p={4} sx={{ position: 'sticky', justifyContent: 'flex-end' }}>
        <IconButton p={0} onClick={onClose}>
          <Text as={IoIosClose} size={36} />
        </IconButton>
      </Flex>
      <Divider mt={0} />
      <Box px={5} sx={{ overflowY: 'auto' }}>
        <Flex
          as="form"
          py={4}
          onSubmit={e => {
            e.preventDefault()
            onClose()
            navigate(`/search/?q=${searchInput.current.value}`)
          }}
        >
          <Text as={BiSearchAlt2} size={18} ml={4} />
          <Input
            ref={searchInput}
            variant="bigSearch"
            type="text"
            placeholder="search bluboho"
            py={0}
            sx={{
              fontWeight: 'heading',
              fontSize: 0,
              '&:focus': {
                outline: 'none',
              },
            }}
          />
        </Flex>
        <Divider />
        {megaMenu.map(menu => (
          <NavGroup
            key={`drawer-title-${menu.title}`}
            menu={menu}
            closeDrawer={closeDrawer}
          >
            {menu.title}
          </NavGroup>
        ))}
        {miniMenu.map(menu => (
          <Box key={`drawer-title-${menu.title}`}>
            <Link
              as={GatsbyLink}
              to={menu.path}
              onClick={closeDrawer}
              p={4}
              sx={{
                display: 'block',
                letterSpacing: 'caps',
                textTransform: 'uppercase',
                fontWeight: 'heading',
                textDecoration: 'none',
                fontSize: 0,
              }}
            >
              {menu.title}
            </Link>
            <Divider />
          </Box>
        ))}
      </Box>
    </Flex>
  )
}

export default NavigationDrawer
