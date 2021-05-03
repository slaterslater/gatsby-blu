import React, { useContext, useState } from 'react'
import Tippy from '@tippyjs/react'
import { Grid, Text, Box, Button } from 'theme-ui'
import { useQuery } from 'urql'
import { BiCircle, BiCheckCircle } from 'react-icons/bi'
import Flag from 'react-world-flags'
import { CurrencyContext } from '../contexts/CurrencyContext'
import { SHOP_CURRENCIES } from '../queries/shop'

const CurrencyCode = React.forwardRef(({ children, ...props }, ref) => (
  <Button
    type="button"
    ref={ref}
    sx={{
      display: 'grid',
      gap: 2,
      gridAutoFlow: 'column',
      letterSpacing: 'caps',
      bg: 'transparent',
      fontSize: 1,
      color: 'white',
    }}
    p={0}
    {...props}
  >
    {children && (
      <Flag height={12} code={children.split('').slice(0, 2).join('')} />
    )}
    {children}
  </Button>
))

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
        <CurrencyCode onClick={() => setVisible(prev => !prev)}>
          {currencyCode}
        </CurrencyCode>
      </Tippy>
    )

  return <CurrencyCode>{currencyCode}</CurrencyCode>
}

export default CurrencyPicker
