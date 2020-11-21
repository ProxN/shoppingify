import 'reflect-metadata';
import { config } from 'dotenv';
config({ path: './config.env' });

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import connectDB from './db';
import authChecker from './utils/authChecker';
import { PORT } from './constants';
import HelloResolver from './resolvers/Hello.resolver';
import AuthResolver from './resolvers/auth/Auth.resolver';
import UserResolver from './resolvers/user/User.resolver';

const Main = async () => {
  await connectDB();

  const app = express();

  app.set('trust proxy', 1);
  const allowedOrigins = ['http://localhost:3000'];

  app.use(
    cors({
      origin: (origin, callback) => {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
          const msg =
            'The CORS policy for this site does not ' + 'allow access from the specified Origin.';
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
      credentials: true,
    })
  );

  app.use(cookieParser());

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, AuthResolver, UserResolver],
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
  });

  app.listen(PORT, () => console.log(`Server starting at PORT ${PORT}`));
};

Main();
