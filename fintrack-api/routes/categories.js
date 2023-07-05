const express = require('express')
const router = express.Router()

const { createCategory, getCategories } = require('../controllers/categories')

router.route('/').get(getCategories).post(createCategory)


module.exports = router