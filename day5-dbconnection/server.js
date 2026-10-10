const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const connectDb = async () => {
  try {
    await mongoose.connect('mongodb+srv://mdaamersk786_db_user:cohort12345@cohort-cluster.xwophof.mongodb.net/');
        console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Database connection failed:', error);
  }
};

connectDb();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});