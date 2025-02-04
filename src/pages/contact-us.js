
import React, { useEffect } from "react"
import { Script } from "gatsby"
import Layout from "../components/layout"
import { Box, Container } from "theme-ui"

const ContactUsPage = () => {
  
  useEffect(()=> {
    const gorgias = document.querySelector("[data-gorgias-contact-form-uid]");
    if (!gorgias) return
    const container = document.getElementById("container"); 
    container.appendChild(gorgias);
  },[])

  const ID = process.env.GATSBY_GORGIAS_FORM_ID

  return (
    <Layout
      title="contact us"
      description="Contact Us"
    >
      <Container id="container" />
      <Script src="https://contact.gorgias.help/api/contact-forms/loader.js?v=3" data-gorgias-loader-contact-form data-gorgias-contact-form-uid={ID} />
    </Layout>
  )
}
export default ContactUsPage