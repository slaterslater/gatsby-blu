import React, { useState } from 'react'
import Tippy from '@tippyjs/react'
import { Grid, Flex, Box, Button, Image, Text } from 'theme-ui'

const CallingCode = React.forwardRef(
  ({ color = 'white', children, ...props }, ref) => {
    CallingCode.displayName = 'AreaCode'
    return (
      <Button
        type="button"
        ref={ref}
        sx={{
          width: 80,
          letterSpacing: 'caps',
          bg: 'transparent',
          fontSize: 1,
          color,
        }}
        p={0}
        {...props}
      >
        {children}
      </Button>
    )
  }
)

const CallingCodePicker = ({
  color,
  countries,
  currentCountry,
  setCurrentCountry,
}) => {
  const [visible, setVisible] = useState(false)

  return (
    <Tippy
      interactive
      theme="light"
      visible={visible}
      onClickOutside={() => setVisible(prev => !prev)}
      content={
        <Grid p={2} sx={{ gridAutoFlow: 'row' }}>
          {countries.map(country => (
            <Box key={`country-${country.abbr}`}>
              <CallingCode
                country={country}
                onClick={() => {
                  setCurrentCountry(country)
                  setVisible(false)
                }}
              >
                {country.abbr}
              </CallingCode>
            </Box>
          ))}
        </Grid>
      }
    >
      <CallingCode color={color} onClick={() => setVisible(prev => !prev)}>
        <Flex sx={{ justifyContent: 'flex-start' }}>
          <Image
            src={`/countries/${currentCountry.abbr.toLowerCase()}.svg`}
            alt=""
            width={20}
            mx={1}
            // mr="auto"
          />
          <Text
            sx={{ lineHeight: '2em' }}
            mx="auto"
          >{`+${currentCountry.callingCode}`}</Text>
        </Flex>
      </CallingCode>
    </Tippy>
  )
}

export default CallingCodePicker
