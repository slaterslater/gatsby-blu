import React from 'react'
import { Menu, MenuButton, MenuList, MenuLink } from '@reach/menu-button'
import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc'
import { Link, Flex, Grid, Box, Text, Checkbox, Container } from 'theme-ui'
import ThemeLink from '../app/ThemeLink'

const FilterSortDropdown = ({ title, items }) => (
  <Menu as={Box}>
    {({ isExpanded }) => (
      <>
        <MenuButton as={Text} variant="caps" sx={{ cursor: 'pointer' }}>
          {title}
          <span aria-hidden="true">
            <Text
              ml={1}
              as={isExpanded ? VscTriangleUp : VscTriangleDown}
              size={10}
              color="primary"
            />
          </span>
        </MenuButton>
        <MenuList
          as={Box}
          sx={{
            bg: 'white',
            position: 'relative',
            zIndex: 10,
            transform: 'translateY(28px)',
            boxShadow: '5px 5px 5px grey',
            height: [
              '100%',
              'calc((100vw - 76px)/2)',
              'calc((100vw - 100px)/4)',
            ],
            maxHeight: 360,
          }}
        >
          {items.map(({ label, param, isSelected, to }) => (
            <MenuLink
              as={ThemeLink}
              key={to}
              isSelected={isSelected}
              to={to}
              variant="caps"
              sx={{
                bg: 'white',
                fontSize: 9,
                fontWeight: isSelected ? 'bold' : 'normal',
                letterSpacing: 'widest',
                textTransform: 'lowercase',
                '&[data-selected]': {
                  background: 'white',
                  color: 'primary',
                },
              }}
            >
              {label}
            </MenuLink>
          ))}
        </MenuList>
      </>
    )}
  </Menu>
)

export default FilterSortDropdown
