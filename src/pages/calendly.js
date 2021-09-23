import { Container, Box, Heading } from 'theme-ui'
import React from 'react'
import { InlineWidget } from 'react-calendly'
import Layout from '../components/layout'

const CalendlyConsultationPage = () => (
  <Layout
    title="Book a Consultation Appointment"
    description="Let us work with you throughout your engagement ring consultation on finding your beloved by bluboho engagement ring or wedding band"
  >
    <Container as="main" sx={{ maxWidth: 680 }}>
      <Box pt={7} pb={5}>
        <Heading>book a consultation</Heading>
      </Box>
      <InlineWidget url="https://calendly.com/ringconsultation" />
    </Container>
  </Layout>
)

export default CalendlyConsultationPage
