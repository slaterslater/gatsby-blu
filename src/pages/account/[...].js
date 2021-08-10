import React from 'react'
import { Router } from '@reach/router'
import LoginPage from '../../components/account/LoginPage'
import CreateAccountPage from '../../components/account/CreateAccountPage'
import ForgotPasswordPage from '../../components/account/ForgotPasswordPage'
import OrdersPage from '../../components/account/OrdersPage'
import OrderDetailPage from '../../components/account/OrderDetailPage'
import Layout from '../../components/layout'
import AuthenticatedRoute from '../../components/AuthenticatedRoute'
import ResetPasswordPage from '../../components/account/ResetPasswordPage'
import ActivateAccountPage from '../../components/account/ActivateAccountPage'

const Account = props => (
  <Layout title="account">
    <Router basepath="/account">
      <LoginPage path="/login" />
      <CreateAccountPage path="/create" />
      <ForgotPasswordPage path="/forgot-password" />
      <ResetPasswordPage path="/reset/:customerId/:resetToken" />
      <ActivateAccountPage path="/activate/:customerId/:activateToken" />
      <AuthenticatedRoute
        component={OrderDetailPage}
        path="/orders/:orderNumber"
      />
      <AuthenticatedRoute component={OrdersPage} path="/" />
    </Router>
  </Layout>
)

export default Account
