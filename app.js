require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const bodyparser = require('body-parser');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const { MONGO } = require('./utils/constants');
const { errorHandler } = require('./middlewares/errors');
const limiter = require('./middlewares/limiter');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect(MONGO, {
  useUnifiedTopology: true,
});

app.use(requestLogger);
app.use(cookieParser());
app.use(bodyparser.json());
app.use(helmet());
app.use(router);
app.use(limiter);
app.use(express.json());
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App is running on port ${PORT}`);
});
