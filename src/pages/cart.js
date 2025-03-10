import { Flex, Button, Box, Container, Grid } from 'theme-ui'
import React, { useContext, useEffect } from 'react'
import { useQuery, useMutation } from 'urql'
import { OutboundLink } from 'gatsby-plugin-google-gtag'
import Layout from '../components/layout'
import { CART_QUERY } from '../queries/checkout'
import CartLineItem from '../components/cart/CartLineItem'
import { OrderSummary } from '../components/cart/OrderSummary'
import { StoreContext } from '../contexts/StoreContext'
import { AuthContext } from '../contexts/AuthContext'
import { CartBuyerIdentityUpdate } from '../mutations/cart'
import { CurrencyContext } from '../contexts/CurrencyContext'

const ShoppingCartPage = props => {
  const { cartId } = useContext(StoreContext)
  const { countryCode } = useContext(CurrencyContext)
  const { accessToken } = useContext(AuthContext)
  const [{ data, fetching }] = useQuery({
    query: CART_QUERY,
    variables: { cartId, countryCode },
    pause: !cartId,
  })

  const [, associateCustomerWithCart] = useMutation(
    CartBuyerIdentityUpdate
  )

  useEffect(() => {
    if ((accessToken, cartId, countryCode)) {
      const buyerIdentity = {
        customerAccessToken: accessToken,
        countryCode
      }
      associateCustomerWithCart({
        cartId,
        buyerIdentity
      })
    }
  }, [accessToken, cartId, associateCustomerWithCart])

  return (
    <Layout title="cart">
      {/* <Container>
        {data && (
          <Grid sx={{ gridTemplateColumns: ['1fr', '2fr 1fr'], gap: 7 }}>
            <Grid sx={{ gridAutoFlow: 'row', gap: 4 }}>
              {data?.node.lineItems?.edges.map(({ node }) => (
                <CartLineItem item={node} key={node.id} imgSize={150} />
              ))}
            </Grid>
            <Box>
              <OrderSummary
                loading={fetching}
                subtotalPriceV2={data.node.subtotalPriceV2}
                totalPriceV2={data.node.totalPriceV2}
                shippingPriceV2={data.node.shippingPriceV2}
                requiresShipping={data.node.requiresShipping}
                note={data.node.note}
              />
              <Flex p={4}>
                <Button
                  as={OutboundLink}
                  href={data?.node.webUrl}
                  sx={{ flex: 1 }}
                >
                  Checkout
                </Button>
              </Flex>
            </Box>
          </Grid>
        )}
      </Container> */}
    </Layout>
  )
}

export default ShoppingCartPage
