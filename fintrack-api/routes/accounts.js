const express = require('express')
const router = express.Router()

const { createAccount, getAccounts, getAccount } = require('../controllers/accounts')

router.route('/').get(getAccounts).post(createAccount)
router.route('/:accountId').get(getAccount)


module.exports = router