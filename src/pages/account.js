import React from 'react'
import { Router } from '@reach/router'
import LoginPage from '../components/account/LoginPage'
import CreateAccountPage from '../components/account/CreateAccountPage'
import Layout from '../components/Layout'

const Account = props => (
  <Layout>
    <Router basepath="/account">
      <LoginPage path="/login" />
      <CreateAccountPage path="/create" />
    </Router>
  </Layout>
)

export default Account
