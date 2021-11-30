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
// const cors = require('cors');

const { PORT = 3000 } = process.env;
const app = express();

// const allowedCors = [
//   'https://space.nomoredomains.rocks',
//   'https://api.space.nomoredomains.rocks',
//   'http://localhost:3000',
// ];

mongoose.connect(MONGO, {
  useUnifiedTopology: true,
});

// app.use(
//   cors({
//     credentials: true,
//     origin(origin, callback) {
//       if (allowedCors.includes(origin) || !origin) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//   }),
// );

// app.options('*', cors());
app.use(requestLogger);
app.use(limiter);
app.use(cookieParser());
app.use(bodyparser.json());
app.use(helmet());
app.use(router);
app.use(express.json());
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App is running on port ${PORT}`);
});
