const jwt = require('jsonwebtoken')

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new Error('Not authorized to access this route')
    }

    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            throw new Error('Not authorized to access this route')
        }
        req.user = { userId: decoded.userId, name: decoded.name}
        next()
    })
}

module.exports = authenticateUser