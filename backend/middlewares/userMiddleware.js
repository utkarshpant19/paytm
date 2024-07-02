import JWT_SECRET from '../config';

const jsonwebtoken = require ('jsonwebtoken');

function authMiddleware (req, res, next) {
  const authHeader = req.header.authorization;
  if (!authHeader || !authHeader.startsWith ('Bearer')) {
    return res.status (403).json ({});
  }

  const token = authHeader.split (' ')[1];

  // Verify the token with the same key
  try {
    const decoded = jsonwebtoken.verify (token, JWT_SECRET);
    if (decoded) {
      req.userId = decoded.userId;
      next ();
    }
  } catch (err) {
    res.status (403).json ({});
  }
}

module.exports = {
    authMiddleware
}