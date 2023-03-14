const mysql = require('mysql')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

// for bcrypt
const saltRounds = 10

const signup = (req, res) => {
  const { email, username, password } = req.body
  let sql = "INSERT INTO users (email, username, password) VALUES (?, ?, ?)"

  bcrypt.hash(password, saltRounds, function(err, hash) {
    sql = mysql.format(sql, [ email, username, hash ])
  
    pool.query(sql, (err, result) => {
      console.log('result', result)
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') return res.status(409).send('email is already registered')
        return handleSQLError(res, err)
      }
      return loginUser(email, password, res)
    })
  })
}

const loginUser = (email, password, res) => {
  let sql = "SELECT * FROM users WHERE email = ?"
  sql = mysql.format(sql, [ email ])

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    if (!rows.length) return res.status(404).send('No matching users')

    const hash = rows[0].password
    bcrypt.compare(password, hash)
      .then(result => {
        if (!result) return res.status(400).send('Invalid password')

        const data = { ...rows[0] }
        data.password = 'REDACTED'

        const token = jwt.sign(data, process.env.JWT_SECRET)
        res.json({
          msg: 'Login successful',
          token,
          user: data
        })
      })
  })
}

const login = (req, res) => {
  const { email, password } = req.body
  loginUser(email, password, res)
}

const logout = (req, res) => {
  res.json({})
}

const checkUser = (req, res)  => {
  // todo -- fetch the user using the user id in the jwt
  res.send(req.user)
}

module.exports = {
  signup,
  login,
  logout,
  checkUser
}