const storeEmails = {
  queen: 'queenstreet@bluboho.com',
  yonge: 'yongest@bluboho.com',
  oakville: 'oakville@bluboho.com',
}

function createRecipientList(body) {
  if (body.subject.includes('wholesale')) return ['wholesale@bluboho.com']
  const mailList = ['guestexperience@bluboho.com']

  if (body.subject.includes('bridal')) {
    // maddie gets all the bridal consultation requests
    mailList.push('maddie@bluboho.com')

    // if the consultation is local, send it to the store too
    Object.keys(storeEmails).forEach(location => {
      if (body.location.toLowerCase().includes(location)) {
        mailList.push(storeEmails[location])
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
