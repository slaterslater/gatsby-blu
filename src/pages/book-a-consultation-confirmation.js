// thank you page post calendly booking confirmed

import { Container, Heading, Text } from "theme-ui";
import SEO from "../components/seo";
import Layout from "../components/layout";

export default function ConsultationConfirmation(){
  return (
    <Layout>
        <SEO title="consultaion confirmed" description="you have booked an appointment with bluboho" />
        <Container variant="medium">
          <Heading as="h1" py={5}>Thank You for Booking Your Appointment</Heading>
          <Text variant="copy" mx="auto">Your appointment has been successfully scheduled — we're thrilled to help you find the perfect piece. 
One of our jewelry specialists will be in touch shortly to confirm the details and ensure everything is tailored to your needs. Whether you're looking for a timeless engagement ring, a one-of-a-kind gift, or simply treating yourself, you're in expert hands.
<br/>
We look forward to meeting you soon!</Text>
        </Container>
    </Layout>
  )
}