import { Divider, Box, Text, IconButton, Flex } from 'theme-ui'
import { IoIosClose } from 'react-icons/io'
import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { FaRegStar } from 'react-icons/fa'
import PropTypes from 'prop-types'
import { graphql, Link, useStaticQuery } from 'gatsby'

const AvailableLocations = ({ locations }) => {
  let message = null
  if (!locations) message = 'loading...'
  else if (!locations.length) message = 'not currently available in-store'
  if (message) {
    return (
      <Text as="p" variant="caps" py={3} px={5}>
        {message}
      </Text>
    )
  }
  return locations.map(({ name, slug, shopName, available }, i) => (
    <Flex key={`store-${i}`} sx={{ alignItems: 'baseline' }}>
      {slug ? (
        <Text
          as={Link}
          to={`/locations/${slug.current}`}
          variant="caps"
          sx={{ color: 'primary' }}
          py={3}
          pl={5}
        >
          {name}
        </Text>
      ) : (
        <Text as="p" variant="caps" py={3} pl={5}>
          {shopName}
        </Text>
      )}
      {available < 4 && <Box as={FaRegStar} size={12} ml={3} />}
    </Flex>
  ))
}

const AvailabilityDrawer = ({ onClose, handle }) => {
  const [locations, setLocations] = useState(null)
  const data = useStaticQuery(graphql`
    {
      allSanityLocation {
        nodes {
          name
          postalCode
          slug {
            current
          }
        }
      }
    }
  `)

  useEffect(() => {
    const getAvailabilityByLocation = async () => {
      const hiddenLocations = [
        'photoshoot',
        'repairs warehouse',
        'warehouse',
        'web store',
        'wholesale warehouse',
      ]
      const res = await axios.post('/api/available-in-store', {
        handle,
      })
      const nodes = res.data.variants.edges
      const locationsWithAvailability = nodes.reduce((total, { node }) => {
        node.inventoryItem.inventoryLevels.edges
          .filter(
            ({ node: { available, location } }) =>
              !!available &&
              !hiddenLocations.includes(location.name.toLowerCase())
          )
          .forEach(({ node: { available, location } }) => {
            const {
              id,
              name: shopName,
              address: { zip },
            } = location
            const store = total.find(spot => spot.id === id)
            if (store) {
              store.available += available
            } else {
              const { name, slug } =
                data.allSanityLocation.nodes.find(
                  ({ postalCode }) =>
                    postalCode.toUpperCase() === zip.toUpperCase()
                ) || {}
              total.push({ id, name, shopName, available, slug })
            }
          })
        return total
      }, [])

      setLocations(locationsWithAvailability)
    }
    getAvailabilityByLocation()
  }, [handle])

  const isLowStock = useMemo(
    () => locations?.find(({ available }) => available < 4),
    [locations]
  )

  return (
    <Flex
      sx={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        position: 'relative',
      }}
    >
      <Box>
        <Flex p={4} sx={{ alignItems: 'center' }}>
          <Text sx={{ fontSize: 3, flex: 1 }}>Availability In-Store</Text>
          <IconButton p={0} ml={6} onClick={onClose}>
            <Text as={IoIosClose} size={24} />
          </IconButton>
        </Flex>
        <Divider m={0} mb={5} />
        <AvailableLocations locations={locations} />
      </Box>
      {isLowStock && (
        <Flex
          mt={7}
          sx={{ justifyContent: 'flex-end', alignItems: 'center' }}
          p={5}
        >
          <Box as={FaRegStar} size={12} mr={4} />
          <Flex sx={{ flexDirection: 'column' }}>
            <Text as="p">low stock</Text>
            <Text as="p">call ahead</Text>
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}

export default AvailabilityDrawer

AvailableLocations.propTypes = {
  locations: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      shopName: PropTypes.string,
      slug: PropTypes.obj,
      available: PropTypes.number,
    })
  ),
}

AvailabilityDrawer.propTypes = {
  onClose: PropTypes.func,
  handle: PropTypes.string,
}
