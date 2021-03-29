import React, { useContext, useMemo } from 'react'
import { Grid, Box, Container, Text, Heading } from 'theme-ui'
import { useQuery } from 'urql'
import { useParams } from '@reach/router'
import { AuthContext } from '../../contexts/AuthContext'
import { CUSTOMER_QUERY } from '../../queries/customer'
import OrderLineItem from './OrderLineItem'

const OrderDetailPage = props => {
  const params = useParams()
  const { accessToken } = useContext(AuthContext)

  const [{ data, fetching, error }] = useQuery({
    query: CUSTOMER_QUERY,
    variables: { customerAccessToken: accessToken },
  })

  const order = useMemo(() => {
    const edge = data?.customer.orders?.edges.find(
      ({ node }) => String(node.orderNumber) === params.orderNumber
    )
    return (edge && edge.node) || undefined
  }, [data])

  console.log({ order })

  if (order) {
    return (
      <Container as="main">
        <Heading>Order #{order.orderNumber}</Heading>
        <Box>Order placed on date</Box>
        <Grid sx={{ gridTemplateColumns: '3fr 1fr', gap: 6 }}>
          <Box>
            {order.lineItems.edges.map(({ node }) => (
              <OrderLineItem key={`order-line-item-${node.id}`} item={node} />
            ))}
            <Box>line items</Box>
            <Box>order details</Box>
          </Box>
          <Box>
            <Box>shipping address</Box>
            <Box>billing address</Box>
          </Box>
        </Grid>
      </Container>
    )
  }

  return null
}

export default OrderDetailPage
