import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 5000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb+srv://admin:QzTM7462RYpX9Y7W@roiim.ppzxn.mongodb.net/<dbname>?retryWrites=true&w=majority',
  JWT_SECRET: process.env.JWT_SECRET || 'nj`!24F_7B}#ED=m9t;.fV3SCAcYsM85XP@*x+z)^yLR&Z>]/?',
  PAYSAFE_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || 'sb',
  accessKeyId: process.env.accessKeyId || 'accessKeyId',
  secretAccessKey: process.env.secretAccessKey || 'secretAccessKey',
};
