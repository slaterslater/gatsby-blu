import React, { useContext } from 'react'
import { Box, Heading } from 'theme-ui'
import { AuthContext } from '../../contexts/AuthContext'
import { CUSTOMER_QUERY } from '../../queries/customer'

const OrdersPage = props => {
  const { accessToken } = useContext(AuthContext)

  const [query] = useQuery(CUSTOMER_QUERY, { customerAccessToken: accessToken })

  console.log(query)
  return (
    <Box as="main" sx={{ maxWidth: 600 }} variant="sectionWrap" mx="auto">
      <Heading>Orders Page</Heading>
      <Box>orders!</Box>
    </Box>
  )
}

export default OrdersPage
