const jwt = require('jsonwebtoken')

const logger = (req, res, next) => {
  console.log(`${req.path} ${new Date().toISOString()}`)
  next()
}

const authenticate = (req, res, next) => {
  const header = req.headers['authorization'] || ''
  const [ bearer, token ] = header.split(' ')

  console.log(header)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch(err) {
    console.log(err)
    res.sendStatus(401)
  }
}

module.exports = {
  logger,
  authenticate
}