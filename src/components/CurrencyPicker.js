import React, { useContext, useState } from 'react'
import Tippy from '@tippyjs/react'
import { Grid, Box, Button, Flex } from 'theme-ui'
import { useQuery } from 'urql'
import { CurrencyContext } from '../contexts/CurrencyContext'
import { SHOP_CURRENCIES } from '../queries/shop'

const CurrencyCode = React.forwardRef(
  ({ color = 'white', children, ...props }, ref) => {
    const moneySymbol = children === 'GBP' ? '£' : '$'
    CurrencyCode.displayName = 'CurrencyCode'
    return (
      <Button
        type="button"
        ref={ref}
        sx={{
          letterSpacing: 'caps',
          bg: 'transparent',
          fontSize: 0,
          color,
          width: 48,
          lineHeight: 'body',
        }}
        px={0}
        py={3}
        {...props}
      >
        {`${moneySymbol} ${children}`}
      </Button>
    )
  }
)

const CurrencyPicker = props => {
  const [visible, setVisible] = useState(false)
  const { currencyCode, setCurrency } = useContext(CurrencyContext)
  const [{ data }] = useQuery({ query: SHOP_CURRENCIES })

  if (data && currencyCode)
    return (
      <Tippy
        interactive
        theme="light"
        visible={visible}
        onClickOutside={() => setVisible(prev => !prev)}
        style={{ height: 48 }}
        content={
          <Grid p={2} sx={{ gridAutoFlow: 'row' }}>
            {data.shop.paymentSettings.enabledPresentmentCurrencies.map(
              currency => (
                <Box key={`currenct-${currency}`}>
                  <CurrencyCode
                    onClick={() => {
                      setCurrency(currency)
                      setVisible(false)
                    }}
                  >
                    {currency}
                  </CurrencyCode>
                </Box>
              )
            )}
          </Grid>
        }
      >
        <CurrencyCode color="black" onClick={() => setVisible(prev => !prev)}>
          {currencyCode}
        </CurrencyCode>
      </Tippy>
    )

  return <CurrencyCode>{currencyCode}</CurrencyCode>
}

export default CurrencyPicker
