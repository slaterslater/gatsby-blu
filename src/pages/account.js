import React from 'react'
import { Router } from '@reach/router'
import LoginPage from '../components/account/LoginPage'
import CreateAccountPage from '../components/account/CreateAccountPage'
import ForgotPasswordPage from '../components/account/ForgotPasswordPage'
import OrdersPage from '../components/account/OrdersPage'
import OrderDetailPage from '../components/account/OrderDetailPage'
import Layout from '../components/layout'
import AuthenticatedRoute from '../components/AuthenticatedRoute'

const Account = props => (
  <Layout>
    <Router basepath="/account">
      <LoginPage path="/login" />
      <CreateAccountPage path="/create" />
      <ForgotPasswordPage path="/forgot-password" />
      <AuthenticatedRoute component={OrderDetailPage} path="/orders/:orderId" />
      <AuthenticatedRoute component={OrdersPage} path="/orders" />
    </Router>
  </Layout>
)

export default Account
