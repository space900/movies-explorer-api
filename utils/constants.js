const { NODE_ENV, JWT_SECRET } = process.env;

const constants = {
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
  MONGO: 'mongodb://localhost:27017/moviesdb',
};

module.exports = constants;
