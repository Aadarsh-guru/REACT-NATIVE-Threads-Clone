const serverless = require("serverless-http");
const express = require("express");
const cors = require('cors');
require("dotenv").config();
const Connection = require('./config/dbConfig.js');
const app = express();
app.use(cors());
app.use(express.json());

// database connection
Connection();

// routes
app.use('/auth', require('./routes/authRoutes.js'))
app.use('/user', require('./routes/userRoutes.js'))
app.use('/post', require('./routes/postRoutes.js'))

// universal get route
app.get('/*', (req, res) => {
  res.send('Hello World!');
});

exports.handler = serverless(app);
