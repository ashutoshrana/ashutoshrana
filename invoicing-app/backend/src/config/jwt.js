import jwt from 'jsonwebtoken';
import { config } from './env.js';

export const generateAccessToken = (userId, userEmail) => {
  return jwt.sign(
    { userId, email: userEmail },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );
};

export const generateRefreshToken = (userId) => {
  return jwt.sign(
    { userId },
    config.jwt.refreshSecret,
    { expiresIn: '30d' }
  );
};

export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, config.jwt.secret);
  } catch {
    return null;
  }
};

export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, config.jwt.refreshSecret);
  } catch {
    return null;
  }
};

export const decodeToken = (token) => jwt.decode(token);
