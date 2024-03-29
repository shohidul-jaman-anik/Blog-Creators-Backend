const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const router = require('./src/app/routes/index');
const httpStatus = require('http-status');
require('dotenv').config();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const colors = require('colors');
const config = require('./config');
const globalErrorHandler = require('./src/app/middlewares/globalErrorHandler/globalErrorHandler');

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));
app.disable('x-powered-by');



mongoose
  .connect(config.database_local, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Database connection successfully'.red.bold))
  .catch(err => {
    console.log('Error connecting to the database:', err);
    process.exit(1); // Exit the application on database connection error
  });

app.use('/api/v1', router);
// app.use('/images', express.static('images'));
app.use(globalErrorHandler);

// server
const port = config.port || 8080;

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});

app.get('/', (req, res) => {
  res.send('Route is working! YaY!');
});

// Handle Not Found
app.use((req, res) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api not found',
      },
    ],
  });
});

module.exports = app;
