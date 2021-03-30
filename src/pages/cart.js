import { Flex, Button, Box, Container, Grid } from 'theme-ui'
import React, { useContext } from 'react'
import { useQuery } from 'urql'
import Layout from '../components/layout'
import { CHECKOUT_QUERY } from '../queries/checkout'
import CartLineItem from '../components/cart/CartLineItem'
import { OrderSummary } from '../components/cart/OrderSummary'
import { StoreContext } from '../contexts/StoreContext'

const ShoppingCartPage = props => {
  const { checkoutId } = useContext(StoreContext)
  const [{ data, fetching }] = useQuery({
    query: CHECKOUT_QUERY,
    variables: { checkoutId },
    pause: !checkoutId,
  })

  return (
    <Layout>
      <Container>
        {data && (
          <Grid sx={{ gridTemplateColumns: '2fr 1fr', gap: 7 }}>
            <Grid sx={{ gridAutoFlow: 'row', gap: 4 }}>
              {data?.node.lineItems?.edges.map(({ node }) => (
                <CartLineItem item={node} key={node.id} />
              ))}
            </Grid>
            <Box>
              <OrderSummary
                loading={fetching}
                subtotalPriceV2={data.node.subtotalPriceV2}
                totalPriceV2={data.node.totalPriceV2}
                shippingPriceV2={data.node.shippingPriceV2}
                requiresShipping={data.node.requiresShipping}
              />
              <Flex p={4}>
                <Button type="button" sx={{ flex: 1 }}>
                  Checkout
                </Button>
              </Flex>
            </Box>
          </Grid>
        )}
        <Box>recommendations</Box>
      </Container>
    </Layout>
  )
}

export default ShoppingCartPage
