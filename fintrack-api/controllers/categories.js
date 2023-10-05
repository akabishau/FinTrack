const User = require('../models/User')
const Category = require('../models/Category')
const { StatusCodes } = require('http-status-codes')


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
    try {
        const user = await User.findById(req.user.userId)

        const { transactionType, name } = req.body
        // checks for empty fields
        const category = await Category.create({ transactionType, name, createdBy: req.user.userId })
        user.categories.push(category._id)
        user.save()

        res.status(StatusCodes.CREATED).json({
            status: 'Success',
            msg: `Category has been created`,
            category,
            user
        })
    } catch (error) {
        console.log(error)
    }
}

// view category
// update a category
// delete a category

module.exports = {
    getCategories,
    createCategory
}