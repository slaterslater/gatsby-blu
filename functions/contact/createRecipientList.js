function createRecipientList(body) {
  const mailList = ['guestexperience@bluboho.com']

  if (body.subject.includes('bridal')) {
    // maddie gets all the bridal consultation requests
    mailList.push('maddie@bluboho.com')

    // if the consultation is local, send it to the store too
    const locations = ['queen', 'yonge', 'oakville']
    locations.forEach(location => {
      if (body.location.toLowerCase().includes(location)) {
        mailList.push(`${location}@bluboho.com`)
      }
    })
  }

  // if we're in test environment, don't send it to the stores
  if (process.env.GATSBY_SHOPIFY_CHECKOUT_BASE.includes('staging')) {
    return mailList.map(email => email.replace('bluboho.com', 'example.com'))
  }
  return mailList
}

module.exports = createRecipientList
