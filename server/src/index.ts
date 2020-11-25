import 'reflect-metadata';
import { config } from 'dotenv';
config({ path: './config.env' });

import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import express from 'express';
import cors from 'cors';
import connectDB from './db';
import authChecker from './utils/authChecker';
import { PORT } from './constants';
import AuthResolver from './resolvers/auth/Auth.resolver';
import UserResolver from './resolvers/user/User.resolver';
import ItemResolver from './resolvers/Item/Item.resolver';

const Main = async () => {
  await connectDB();

  const app = express();

  // app.set('trust proxy', 1);
  // const allowedOrigins = ['http://localhost:3000'];

  // app.use(
  //   cors({
  //     origin: (origin, callback) => {
  //       // allow requests with no origin
  //       // (like mobile apps or curl requests)
  //       if (!origin) return callback(null, true);
  //       if (allowedOrigins.indexOf(origin) === -1) {
  //         const msg =
  //           'The CORS policy for this site does not ' + 'allow access from the specified Origin.';
  //         return callback(new Error(msg), false);
  //       }
  //       return callback(null, true);
  //     },
  //   })
  // );

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

  app.use(cookieParser());

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ItemResolver, AuthResolver, UserResolver],
      validate: false,
      authChecker,
    }),
    context: ({ req, res }) => ({
      req,
      res,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(PORT, () => console.log(`Server starting at PORT ${PORT}`));
};

Main();
