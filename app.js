require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const usersRoutes = require('./bitfilmsdb/routes/users');
const { login, createUser } = require('./bitfilmsdb/controllers/users');
const { auth } = require('./middlewares/auth');
const { loginValidation, userValidation } = require('./middlewares/validation');
const NotFoundError = require('./errors/classes/notFoundError');
const messages = require('./errors/messages');

const { PORT = 3000 } = process.env;
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useUnifiedTopology: true,
});

app.use(cookieParser());
app.use(helmet());
app.use(limiter);
app.use(express.json());

app.post('/signin', loginValidation, login);
app.post('/signup', userValidation, createUser);

app.use('/', auth, usersRoutes);

app.use('*', () => {
  throw new NotFoundError(messages.SERVER_NOT_FOUND);
});

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App is running on port ${PORT}`);
});
