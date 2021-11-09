import React, { useState, useEffect } from 'react'
import { Button, Link, Flex, Grid, Box, Text, Checkbox } from 'theme-ui'
import { useLocation, useParams } from '@reach/router'
import { parse, stringify } from 'qs'
import { Link as GatsbyLink } from 'gatsby'
import {
  VscTriangleRight,
  VscTriangleDown,
  VscTriangleUp,
} from 'react-icons/vsc'
import { Menu, MenuButton, MenuList, MenuLink } from '@reach/menu-button'
import FilterSortDropdown from './FilterSortDropdown'
import Modal from '../Modal'
import ModalCategoryOptionGroup from './ModalCategoryOptionGroup'
import ThemeLink from '../app/ThemeLink'

const sortOptions = [
  {
    label: 'new arrivals',
    param: 'latest',
  },
  {
    label: 'Price: Low To High',
    param: 'price-asc',
  },
  {
    label: 'Price: High To Low',
    param: 'price-desc',
  },
]

const CollectionFilterAndSort = ({ title, productCount }) => {
  const location = useLocation()
  const currentParams = parse(location.search.replace('?', ''))
  const [modalOpen, setOpen] = useState(false)

  const currentOptions = sortOptions.map(option => {
    const nextParams = {
      ...currentParams,
      sort: option.param,
    }
    const searchString = stringify(nextParams)

    const pathWithSortParam = `${location.pathname}?${searchString}`

    return {
      ...option,
      isSelected: currentParams.sort === option.param,
      to: pathWithSortParam,
    }
  })

  return (
    <>
      <Box
        pt={5}
        sx={{ display: ['none', 'flex'], justifyContent: 'space-between' }}
      >
        <Grid
          sx={{
            gridTemplateColumns: 'repeat(5, max-content)',
            gap: 2,
            alignItems: 'center',
          }}
        >
          <Text variant="caps">Collection</Text>
          <Box sx={{ flexShrink: 0 }}>
            <Text as={VscTriangleRight} size={10} sx={{ color: '#C4C4C4' }} />
          </Box>
          <Text variant="caps">{title}</Text>
          <Box sx={{ flexShrink: 0 }}>
            <Text as={VscTriangleDown} size={10} sx={{ color: 'primary' }} />
          </Box>
          <Text variant="caps">{productCount} products</Text>
        </Grid>

        <Box>
          <FilterSortDropdown title="sort by" items={currentOptions} />
        </Box>
      </Box>
      <Box pt={5} sx={{ display: ['flex', 'none'], justifyContent: 'center' }}>
        <Button
          type="button"
          variant="unset"
          sx={{ display: 'flex', alignItems: 'center' }}
          onClick={() => setOpen(true)}
        >
          <Text variant="caps">sort</Text>
          <Box ml={1} sx={{ flexShrink: 0 }}>
            <Text as={VscTriangleDown} size={10} sx={{ color: 'primary' }} />
          </Box>
        </Button>
      </Box>
      <Modal isOpen={modalOpen} setOpen={setOpen}>
        <Box p={4}>
          <ModalCategoryOptionGroup title="filters" items={currentOptions} />
          <Flex
            pt={4}
            sx={{
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Button type="button" mb={4} onClick={() => setOpen(false)}>
              Apply Filters
            </Button>
            <ThemeLink
              to={location.pathname}
              onClick={() => setOpen(false)}
              variant="caps"
              sx={{
                textDecoration: 'underline',
                fontWeight: 'medium',
                fontSize: 9,
              }}
            >
              Clear All
            </ThemeLink>
          </Flex>
        </Box>
      </Modal>
    </>
  )
}

export default CollectionFilterAndSort
