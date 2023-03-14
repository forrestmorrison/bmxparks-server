const express = require('express')
const authController = require('../controllers/auth')
const { authenticate } = require('../middleware')
const router = express.Router()

router.post('/signup', authController.signup)

router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/checkUser', authenticate, authController.checkUser)

module.exports = router