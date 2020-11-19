import 'reflect-metadata';
import { config } from 'dotenv';
config({ path: './config.env' });

import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import connectDB from './db';
import { PORT } from './constants';
import HelloResolver from './resolvers/Hello.resolver';
import AuthResolver from './resolvers/auth/Auth.resolver';

const Main = async () => {
  await connectDB();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, AuthResolver],
      validate: false,
    }),
  });

  apolloServer.applyMiddleware({
    app,
  });

  app.listen(PORT, () => console.log(`Server starting at PORT ${PORT}`));
};

Main();
