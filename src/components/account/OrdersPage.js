import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { Box, Container, Grid, Text, Heading } from 'theme-ui'
import { useQuery } from 'urql'
import { titleize } from 'inflected'
import { AuthContext } from '../../contexts/AuthContext'
import { CUSTOMER_QUERY } from '../../queries/customer'
import FormattedPrice from '../util/FormattedPrice'
import AccountPage from './AccountPage'

const OrdersPage = props => {
  const { accessToken } = useContext(AuthContext)

  const [{ data, fetching, error }] = useQuery({
    query: CUSTOMER_QUERY,
    variables: { customerAccessToken: accessToken },
  })

  if (data) {
    return (
      <AccountPage
        title="My Orders"
        subtitle={`Welcome back, ${data.customer.displayName}`}
        currentPage={{ text: 'Orders', path: '/account' }}
      >
        <Box pt={6}>
          <Grid
            py={3}
            sx={{
              gridTemplateColumns: '1fr 2fr 2fr 1fr',
              borderBottom: '1px solid',
              borderColor: 'border',
            }}
          >
            <Text px={2} variant="caps">
              order
            </Text>
            <Text px={2} variant="caps">
              payment status
            </Text>
            <Text px={2} variant="caps">
              fulfillment status
            </Text>
            <Text px={2} variant="caps">
              total
            </Text>
          </Grid>
          {data.customer.orders.edges.map(
            ({
              node: {
                orderNumber,
                financialStatus,
                totalPriceV2,
                id,
                fulfillmentStatus,
              },
            }) => (
              <Grid
                key={`order-grid-${id}`}
                sx={{
                  gridTemplateColumns: '1fr 2fr 2fr 1fr',
                  '&:nth-child(odd)': { bg: 'border' },
                }}
                py={3}
              >
                <Text px={2} sx={{ fontSize: 2 }}>
                  <Link to={`/account/orders/${orderNumber}`}>
                    {orderNumber}
                  </Link>
                </Text>
                <Text px={2} sx={{ fontSize: 2 }}>
                  {titleize(financialStatus)}
                </Text>
                <Text px={2} sx={{ fontSize: 2 }}>
                  {titleize(fulfillmentStatus)}
                </Text>
                <Text px={2} sx={{ fontSize: 2 }}>
                  <FormattedPrice priceV2={totalPriceV2} />
                </Text>
              </Grid>
            )
          )}
        </Box>
      </AccountPage>
    )
  }

  return null
}

export default OrdersPage
