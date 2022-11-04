import React, { useContext } from 'react'
import { Box, Link, Flex, Text } from 'theme-ui'
import { FiInfo } from 'react-icons/fi'
import { CurrencyContext } from '../../contexts/CurrencyContext'

const SezzleInfo = ({ variantPrice }) => {
  const { currencyCode } = useContext(CurrencyContext)
  // sezzle for canada and if less than 1,000
  if (currencyCode !== 'CAD' || !variantPrice || variantPrice.includes(',')) {
    return <></>
  }
  // get digits from price string and divide by 4
  const price = variantPrice.match(/\d+/)
  const sezzlePayment = variantPrice.replace(/\d+/, Math.ceil(price / 4))
  return (
    <Text
      // as="p"
      variant="small"
      sx={{
        fontSize: 0,
        textAlign: 'right',
        span: { fontWeight: 'bold' },
        lineHeight: '1.5em',
      }}
    >
      or 4 interest-free payments
      <Flex sx={{ justifyContent: 'flex-end', alignContent: 'center' }}>
        of&nbsp;
        <span>{sezzlePayment}</span>
        &nbsp;with&nbsp;
        <Link
          href="https://sezzle.com/how-it-works"
          target="_blank"
          sx={{
            backgroundImage: 'url(/Sezzle_Logo_FullColor.svg)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left',
            width: 65,
            height: 13,
            display: 'flex',
            alignItems: 'center',
            '.off': {
              position: 'absolute',
              left: '-9999em',
            },
          }}
        >
          <span className="off">Sezzle</span>
          <Box as={FiInfo} ml="auto" />
        </Link>
      </Flex>
    </Text>
  )
}

export default SezzleInfo
