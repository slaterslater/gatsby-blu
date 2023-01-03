import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { Box, Grid, Text } from 'theme-ui'
import { useQuery } from 'urql'
import { AuthContext } from '../../contexts/AuthContext'
import { CUSTOMER_QUERY } from '../../queries/customer'
import FormattedPrice from '../FormattedPrice'
import AccountPage from './AccountPage'

const OrdersPage = () => {
  const { accessToken } = useContext(AuthContext)

  const [{ data }] = useQuery({
    query: CUSTOMER_QUERY,
    variables: { customerAccessToken: accessToken },
  })

  if (!data) return null
  return (
    <AccountPage
      title="My Orders"
      subtitle={`welcome back, ${data.customer.displayName}`}
      currentPage={{ text: 'Orders', path: '/account' }}
    >
      <Box
        py={3}
        sx={{
          '.orderLine': {
            gap: 0,
            paddingLeft: 2,
            gridTemplateColumns: ['1fr 1fr 1.5fr 1fr', '1fr 2fr 2fr 1fr'],
            a: { color: 'primary' },
            '&:nth-child(odd)': { bg: 'border' },
            '&:nth-child(1)': {
              fontWeight: 'bold',
              bg: 'white',
              borderBottom: '1px solid',
              borderColor: 'border',
            },
          },
        }}
      >
        <Grid className="orderLine" py={3}>
          <Text variant="caps">order</Text>
          <Text variant="caps">payment</Text>
          <Text variant="caps">fulfillment</Text>
          <Text variant="caps">total</Text>
        </Grid>
        {data.customer.orders.edges.map(
          ({
            node: {
              orderNumber,
              financialStatus,
              totalPriceV2,
              fulfillmentStatus,
            },
          }) => (
            <Grid key={orderNumber} className="orderLine" py={3}>
              <Text>
                <Link to={`/account/orders/${orderNumber}`}>{orderNumber}</Link>
              </Text>
              <Text>{financialStatus.toLowerCase()}</Text>
              <Text>{fulfillmentStatus.toLowerCase()}</Text>
              <Text>
                <FormattedPrice priceV2={totalPriceV2} />
              </Text>
            </Grid>
          )
        )}
      </Box>
    </AccountPage>
  )
}

export default OrdersPage
