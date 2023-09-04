const mongoose = require('mongoose')

mongoose.set('strictQuery', true);

const Connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = Connection;