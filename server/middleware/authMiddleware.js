const jwt = require('jsonwebtoken');
const secretKey = require('../secret')

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  //console.log(token)
  if (!token) return res.status(401).json({ message: 'Unauthorized 90' });

  const tokenWithoutBearer = token.replace('Bearer ', '');

  jwt.verify(tokenWithoutBearer, secretKey, (err, user) => {
    if (err) {
      console.log(err)
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = user;
    //console.log(user)
    //console.log(req.params)
    //console.log(req.body)
    next();
  });
}

module.exports = authenticateToken;