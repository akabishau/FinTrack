const User = require('../models/User')
const { Category, TransType } = require('../models/Category')
const { StatusCodes } = require('http-status-codes')

// get all categories
const getCategories = async (req, res) => {
    console.log('getCategories')
    try {
        const user = await User.findById(req.user.userId)
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'User not found' })
        }
        const categories = await Category.find({ createdBy: req.user.userId })
        if (!categories) {
            return res.status(StatusCodes.NOT_FOUND).json({ error: 'No categories found' })
        }
        res.status(StatusCodes.OK).json({ categories })

    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Server error' });
    }
}

const createCategory = async (req, res) => {
    req.body.createdBy = req.user.userId // add user Id to the request's body
    const category = await Category.create(req.body)
    res.status(StatusCodes.CREATED).json({
        status: 'Success',
        msg: `Category has been created`,
        category
    })
}

// view category
// update a category
// delete a category

module.exports = {
    getCategories,
    createCategory
}