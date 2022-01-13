const jwt = require('jsonwebtoken');

const { UnauthorizedError } = require('../errors/index');
const { JWT_SECRET } = require('../utils/constants');

const authCheck = (req, res, next) => {
  // получение авторизационного заголовока
  const { authorization } = req.headers;

  // проверка того, что заголовок существует или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  // извлечение токена
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // верификация токена
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // если все сломалось, то отправка ошибки
    throw new UnauthorizedError('Необходима авторизация');
  }
  req.user = payload; // запись пейлоуда в объект запроса
  return next(); // отправка запроса дальше
};

module.exports = authCheck;
