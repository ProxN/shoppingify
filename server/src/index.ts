import 'reflect-metadata';
import { config } from 'dotenv';
config({ path: './config.env' });

import express from 'express';
import connectDB from './db';
import { PORT } from './constants';

const Main = async () => {
  await connectDB();

  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello World');
  });

  app.listen(PORT, () => console.log(`Server starting at PORT ${PORT}`));
};

Main();
