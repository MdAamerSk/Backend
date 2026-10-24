const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes');
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true // because we are sending cookies from the server to the client, we need to set this option to true
}));

app.use(express.json());

app.use("/user", userRoutes);

module.exports = app;

