import jwt from 'jsonwebtoken';

const verifyToken = (token: string): boolean => {
  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY || '');
    return true; // Token is valid
  } catch (error) {
    return false; // Token verification failed or token expired
  }
};

export default verifyToken;
