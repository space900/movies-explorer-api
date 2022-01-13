require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const { MONGO_URL } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const rateLimiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const { PORT = 3000 } = process.env;

const app = express();

app.use(requestLogger);

app.use(
  rateLimiter,
  helmet(),
  cors({
    credentials: true,
    origin: [
      'https://space.nomoredomains.rocks',
      'https://api.space.nomoredomains.rocks',
      'http://localhost:3000',
      'http://localhost:3001',
    ],
  }),
);

app.options('*', cors()); // preflight request

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.use('/', require('./routes'));

app.use(errorLogger);

app.use(
  errors(),
  errorHandler,
);

app.listen(PORT);

