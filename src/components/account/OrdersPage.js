import React, { useContext } from 'react'
import { Box, Container, Grid, Text, Heading } from 'theme-ui'
import { useQuery } from 'urql'
import { AuthContext } from '../../contexts/AuthContext'
import { CUSTOMER_QUERY } from '../../queries/customer'
import FormattedPrice from '../util/FormattedPrice'

const OrdersPage = props => {
  const { accessToken } = useContext(AuthContext)

  const [{ data, fetching, error }] = useQuery({
    query: CUSTOMER_QUERY,
    variables: { customerAccessToken: accessToken },
  })

  if (data) {
    return (
      <Container as="main">
        <Heading>My Account</Heading>
        <Text>Welcome back, {data.customer.displayName}</Text>
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
                <Box px={2}>{orderNumber}</Box>
                <Text px={2}>{financialStatus}</Text>
                <Text px={2}>{fulfillmentStatus}</Text>
                <Text px={2}>
                  <FormattedPrice
                    amount={totalPriceV2.amount}
                    currency={totalPriceV2.currencyCode}
                  />
                </Text>
              </Grid>
            )
          )}
        </Box>
      </Container>
    )
  }

  return null
}

export default OrdersPage
