// Mongodb connection
const mongoose = require('mongoose');

const connectDB = async () => {
  mongoose.connect(
    process.env.DATABASE_ACCESS, 
    { 
      useNewUrlParser: true, 
      useUnifiedTopology: true, 
      useCreateIndex: true, 
    })
    .then(() => console.log('Connected to database'))
    .catch((err) => console.log('Somethingwent wrong', err))
};

module.exports = connectDB;
