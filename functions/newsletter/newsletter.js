function wait(ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body)

  const requiredFields = ['email']

  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: `You are missing the ${field} field` }),
      }
    }
  }

  await wait(2000)

  // if newsletter created
  return {
    statusCode: 201,
    body: JSON.stringify({ message: 'Success' }),
  }

  // if customer already exists with newsletter return no change status
  // return {
  //   statusCode: 200,
  //   body: JSON.stringify({ message: 'You are already subscribed' }),
  // }
}
