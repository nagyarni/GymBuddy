const jwt = require('jsonwebtoken');
const secretKey = require('../secret')

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  const tokenWithoutBearer = token.replace('Bearer ', '');

  jwt.verify(tokenWithoutBearer, secretKey, (err, user) => {
    if (err) {
      console.log(err)
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = user;
    //console.log(user)
    next();
  });
}

module.exports = authenticateToken;