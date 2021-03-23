import React, { useContext } from 'react'
import { Box, Heading } from 'theme-ui'
import { useQuery } from 'urql'
import { AuthContext } from '../../contexts/AuthContext'
import { CUSTOMER_QUERY } from '../../queries/customer'

const OrdersPage = props => {
  const { accessToken } = useContext(AuthContext)

  const [{ data, fetching, error }] = useQuery({
    query: CUSTOMER_QUERY,
    variables: { customerAccessToken: accessToken },
  })

  console.log({ data, accessToken })
  return (
    <Box as="main" sx={{ maxWidth: 600 }} variant="sectionWrap" mx="auto">
      <Heading>Orders Page</Heading>
      {data?.customer.orders.edges.map(({ node: { orderNumber } }) => (
        <Box>
          <Box>{orderNumber}</Box>
        </Box>
      ))}
    </Box>
  )
}

export default OrdersPage
