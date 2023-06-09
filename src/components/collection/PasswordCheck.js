import React, { useEffect } from 'react'
import { Box, Input, Text } from 'theme-ui'
import store from 'store'

const PasswordCheck = ({ password, setShouldShow, handle }) => {
  const STORAGE_PASSWORD = `password-${handle}`

  const verify = value => {
    const isMatch = value?.trim() === password.trim()
    if (!isMatch) return
    store.set(STORAGE_PASSWORD, password)
    setShouldShow(true)
  }

  useEffect(() => {
    const savedPassword = store.get(STORAGE_PASSWORD)
    verify(savedPassword)
  }, [])

  const handleChange = e => {
    const { value } = e.target
    verify(value)
  }

  return (
    <Box sx={{ width: 380 }} mx="auto">
      <Text as="p" variant="caps" sx={{ fontWeight: 'bold' }} mt={6} py={2}>
        enter password to view this collection
      </Text>
      <Input onChange={handleChange} />
    </Box>
  )
}

export default PasswordCheck
