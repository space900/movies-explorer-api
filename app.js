const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const usersRoutes = require('./bitfilmsdb/routes/users');
const { auth } = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useUnifiedTopology: true,
});

app.use(limiter);
app.use(express.json());

app.use('/', auth, usersRoutes);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App is running on port ${PORT}`);
});
