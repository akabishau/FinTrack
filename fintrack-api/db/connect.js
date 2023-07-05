const mongoose = require('mongoose')

const connectDB = (url) => {
    // const mongoUrl = 'mongodb+srv://alekseykabishau:caHqo2-qobpog-zogryh@cluster0.wndvuvl.mongodb.net/FinTrackDB?retryWrites=true&w=majority'
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
}

module.exports = connectDB