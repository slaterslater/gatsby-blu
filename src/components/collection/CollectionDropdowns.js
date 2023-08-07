import React, { useState } from 'react'
import { Menu, MenuButton, MenuList, MenuLink } from '@reach/menu-button'
import { VscTriangleDown, VscTriangleUp } from 'react-icons/vsc'
import { Box, Button, Divider, Flex, Label, NavLink, Text } from 'theme-ui'
import { navigate } from 'gatsby'
import { Field, Form, Formik } from 'formik'
import { mapValues } from 'lodash'
import { stringify } from 'qs'
import { BiMinus, BiPlus } from 'react-icons/bi'
import SubmitButton from '../app/formik/SubmitButton'
import Modal from '../Modal'
import ThemeLink from '../app/ThemeLink'

const DropdownMenuButton = ({ label, isExpanded }) => (
  <MenuButton
    as={Text}
    variant="caps"
    sx={{
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: 50,
      lineHeight: 2,
    }}
  >
    {!isExpanded ? label : 'close'}
    <span aria-hidden="true">
      <Text
        ml={1}
        as={isExpanded ? VscTriangleUp : VscTriangleDown}
        size={10}
        color="primary"
      />
    </span>
  </MenuButton>
)

export const DropdownSort = ({ sortOptions }) => (
  <Menu>
    {({ isExpanded }) => (
      <Box as="nav">
        <DropdownMenuButton isExpanded={isExpanded} label="sort" />
        <MenuList
          as={Box}
          sx={{
            maxHeight: 360,
            minHeight: 120,
            bg: 'bbBackground',
            position: 'relative',
            // zIndex: 10,
            zIndex: 1110,
            minWidth: 250,
          }}
          mt={3}
          px={3}
        >
          <SortOptions sortOptions={sortOptions} isMenuLink />
        </MenuList>
      </Box>
    )}
  </Menu>
)

export const DropdownFilter = ({
  filterOptions,
  currentPath,
  selectedFilters,
}) => (
  <Menu>
    {({ isExpanded }) => (
      <Box as="nav" ml="auto" mr={7}>
        <DropdownMenuButton isExpanded={isExpanded} label="filter" />
        <MenuList
          as={Box}
          sx={{
            bg: 'bbBackground',
            position: 'relative',
            zIndex: 10,
            width: 300,
          }}
          mt={3}
          px={3}
        >
          <FilterForm
            filterOptions={filterOptions}
            currentPath={currentPath}
            selectedFilters={selectedFilters}
            isMenuLink
          />
        </MenuList>
      </Box>
    )}
  </Menu>
)

const SortOptions = ({ sortOptions, isMenuLink = false }) => {
  const SortLink = isMenuLink ? MenuLink : NavLink
  return (
    <Box px={[4, 0]} mb={[5, 0]}>
      {sortOptions.map(({ label, param, isSelected, to }) => {
        const [key, value] = label.split(':')
        return (
          <SortLink
            as={NavLink}
            key={to}
            isSelected={isSelected}
            onClick={() => navigate(to)}
            variant="caps"
            sx={{
              display: 'block',
              fontSize: 9,
              fontWeight: isSelected ? 'bold' : 'normal',
              letterSpacing: 'widest',
              // textTransform: 'lowercase',
              textTransform: 'revert',
              '&[data-selected]': {
                // background: 'white',
                background: 'none',
                color: 'primary',
              },
            }}
            py={2}
          >
            {key.toUpperCase()}
            {value ? `: ${value.toLowerCase()}` : ''}
          </SortLink>
        )
      })}
    </Box>
  )
}

const FilterForm = ({
  filterOptions,
  currentPath,
  selectedFilters,
  isMenuLink = false,
  onSubmit = () => {},
}) => {
  const initialValues = mapValues(selectedFilters, values => values.split(' '))
  const Submit = isMenuLink ? MenuLink : Button

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        const filterString = stringify(values, {
          arrayFormat: 'comma',
        }).replaceAll('%2C', '+')

        navigate(`${currentPath}&${filterString}`)
      }}
    >
      <Form>
        <Text variant="caps">Filters</Text>
        <Divider />
        {filterOptions.map(({ label, options }, i) => (
          <React.Fragment key={`filter-group-${i}`}>
            <Accordion title={label}>
              <Box
                role="group"
                aria-labelledby="checkbox-group"
                sx={{ input: { accentColor: 'black' } }}
              >
                {options.map(option => (
                  <Label
                    sx={{ display: 'flex', alignItems: 'center' }}
                    key={option}
                    pb={1}
                  >
                    <Field type="checkbox" name={label} value={option} />
                    <Text sx={{ color: 'primary' }} pl={2}>
                      {option.replaceAll('-', ' ')}
                    </Text>
                  </Label>
                ))}
              </Box>
            </Accordion>
            <Divider />
          </React.Fragment>
        ))}
        <Box sx={{ justifyContent: 'center', textAlign: 'center' }} mt={5}>
          <Submit
            as={SubmitButton}
            onClick={onSubmit}
            sx={{
              backgroundColor: '#ECE7E1 !important',
              color: 'black !important',
            }}
          >
            Apply Filters
          </Submit>
          <Submit
            as={ThemeLink}
            to="."
            onClick={onSubmit}
            variant="caps"
            sx={{
              // textDecoration: 'underline',
              fontWeight: 'medium',
              fontSize: 0,
              backgroundColor: 'transparent !important',
              color: 'black !important',
              display: 'block',
            }}
            mt={3}
          >
            Clear All
          </Submit>
        </Box>
      </Form>
    </Formik>
  )
}

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Box sx={{ position: 'relative' }}>
      <Flex onClick={() => setIsOpen(prev => !prev)} p={3}>
        <Text sx={{ flex: 1 }} variant="caps">
          {title}
        </Text>
        <Box as={isOpen ? BiMinus : BiPlus} />
      </Flex>
      {isOpen && <Box px={4}>{children}</Box>}
    </Box>
  )
}

export const ModalSortAndFilter = ({
  sortOptions,
  filterOptions,
  currentPath,
  selectedFilters,
}) => {
  const [modalOpen, setModalOpen] = useState(false)
  const hasFilters = !!filterOptions.length

  return (
    <>
      <Box pt={5} sx={{ display: ['flex', 'none'], justifyContent: 'center' }}>
        <Button
          type="button"
          variant="unset"
          sx={{ display: 'flex', alignItems: 'center' }}
          onClick={() => setModalOpen(true)}
        >
          <Text variant="caps">{`sort ${hasFilters ? '& filter' : ''}`}</Text>
          <VscTriangleDown size={10} />
        </Button>
      </Box>
      <Modal isOpen={modalOpen} setOpen={setModalOpen}>
        <Box p={4}>
          <Text sx={{ flex: 1 }} variant="caps">
            sort
          </Text>
          <Divider />
          <SortOptions sortOptions={sortOptions} />
          {hasFilters && (
            <FilterForm
              filterOptions={filterOptions}
              currentPath={currentPath}
              selectedFilters={selectedFilters}
              onSubmit={() => setModalOpen(false)}
            />
          )}
        </Box>
      </Modal>
    </>
  )
}
