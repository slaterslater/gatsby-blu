import React, { useEffect } from 'react'
import { Container, Text, Heading, Button } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { navigate } from '@reach/router'
import Layout from '../components/layout'
import SEO from '../components/seo'
import OrderPageRedirect from '../components/OrderPageRedirect'

const NotFoundView = props => {
  useEffect(() => {
    navigate('/')
  }, [])

  return <OrderPageRedirect />
}

export default NotFoundView
