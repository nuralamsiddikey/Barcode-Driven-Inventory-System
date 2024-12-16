import mongoose from 'mongoose';
import config from '../config/config.js';

const ConnectDB = () => {
  mongoose
    .connect(config.mongo_url, {})
    .then(() => {
      console.log('Connected to MongoDB successfully!');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err.message);
    });
};

export default ConnectDB;
