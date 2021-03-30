import React, { useContext, useMemo } from 'react'
import { Divider, Grid, Box, Container, Text, Heading, Flex } from 'theme-ui'
import { useQuery } from 'urql'
import { useParams } from '@reach/router'
import { AuthContext } from '../../contexts/AuthContext'
import { CUSTOMER_QUERY } from '../../queries/customer'
import OrderLineItem from './OrderLineItem'
import { OrderSummary } from '../cart/OrderSummary'
import MailingAddress from '../Address'
import AccountPage from './AccountPage'
import LineItemPrice from '../LineItemPrice'

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

  if (order) {
    return (
      <AccountPage
        links={[{ path: '/account', text: 'orders' }]}
        currentPage={{
          text: `order ${order.orderNumber}`,
          link: `/account/orders/${order.orderNumber}`,
        }}
        title={`Order #${order.orderNumber}`}
        subtitle="Order placed on date"
      >
        <Grid sx={{ gridTemplateColumns: '3fr 1fr', gap: 7 }}>
          <Box pt={6}>
            <Grid
              py={2}
              sx={{
                gridTemplateColumns: '4fr 1fr 1fr',
              }}
            >
              <Text variant="caps">Product</Text>
              <Text variant="caps">Quantity</Text>
              <Text variant="caps" sx={{ justifySelf: 'end' }}>
                Total
              </Text>
            </Grid>
            <Divider />
            {order.lineItems.edges.map(({ node }) => (
              <OrderLineItem key={`order-line-item-${node.id}`} item={node} />
            ))}
            <Divider />
            <Flex sx={{ justifyContent: 'flex-end' }}>
              <Box sx={{ minWidth: '320px' }}>
                <OrderSummary
                  subtotalPriceV2={order.subtotalPriceV2}
                  totalPriceV2={order.totalPriceV2}
                  requiresShipping
                />
              </Box>
            </Flex>
          </Box>
          <Box pt={6}>
            <Box py={1}>
              <Text variant="caps">Shipping Address</Text>
            </Box>
            <Divider my={3} />
            {!order.shippingAddress && (
              <Text sx={{ fontSize: 1 }}>
                No shipping address was required for this order
              </Text>
            )}
            {order.shippingAddress && (
              <MailingAddress mailingAddress={order.shippingAddress} />
            )}
          </Box>
        </Grid>
      </AccountPage>
    )
  }

  return null
}

export default OrderDetailPage
