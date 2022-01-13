const { NODE_ENV, JWT_SECRET, MONGO_URL } = process.env;

const constants = {
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
  MONGO_URL: NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/moviesdb',
};

module.exports = constants;
