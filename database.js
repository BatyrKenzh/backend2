const mongoose = require('mongoose');

const connectDB = async () => {
    const uri = 'mongodb+srv://batyr:khsvt5NRpEx7L@cluster0.hyw4cbv.mongodb.net/Cluster0?retryWrites=true&w=majority&appName=Cluster0';
    
    try {
        await mongoose.connect(uri);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
};

module.exports = connectDB;