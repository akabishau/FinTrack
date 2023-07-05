const express = require('express')
const router = express.Router()

const { createAccount, getAccounts } = require('../controllers/accounts')

router.route('/').get(getAccounts).post(createAccount)


module.exports = router