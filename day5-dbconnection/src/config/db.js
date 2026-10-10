const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect('mongodb+srv://mdaamersk786_db_user:cohort12345@cohort-cluster.xwophof.mongodb.net/');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
}

module.exports = connectDb;