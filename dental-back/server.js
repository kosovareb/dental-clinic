const express = require("express");
const app = express();
const router = require("./routes/index");
const bodyParser = require("body-parser");
require('dotenv').config();
const cors = require("cors");
const morgan = require("morgan");
const testDatabaseConnection = require('./database/testConnection')
const path = require('path');


// Set up middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin: '*', // You can specify the allowed origin(s) here
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Authorization, Origin, X-Requested-With, Content-Type, Accept'
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Apply routes
app.use(router);

// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message);
});


// PORT
const port = process.env.APP_PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

testDatabaseConnection();
