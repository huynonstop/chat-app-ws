import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

export default function verifyUser(req, res, next) {
  const token = req.get('Authorization').split(' ')[1];
  if (!token) {
    return res.status(401).json({
      error: 'NOT_AUTH',
    });
  }
  const decodedToken = jwt.verify(token, JWT_SECRET);
  if (!decodedToken) {
    return res.status(401).json({
      error: 'NOT_AUTH',
    });
  }
  req.userId = decodedToken.id;
  next();
}
