const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: 2,
        maxLength: 50
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Email is invalid'
        ]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: 6
    },
    transactionTypes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'TransactionType',
        required: true
    },
    categories: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Category',
        required: true
    },
    accounts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Account',
        required: true,
        default: []
    }
})


userSchema.pre('save', async function (next) {
    console.log('userSchema.pre(save)')
    // hash password before saving
    if (this.isModified('password')) {
        console.log('modified password')
        try {
            const salt = await bcrypt.genSalt(10)
            this.password = await bcrypt.hash(this.password, salt)
            next()
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    console.log('other presave actions completed')
    next()
})

// use jwt to sign token
userSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId: this._id, name: this.name },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }

    )
}

userSchema.methods.comparePasswords = async function (password) {
    return await bcrypt.compare(password, this.password)
}



const User = mongoose.model('User', userSchema)
module.exports = User