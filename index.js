import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import http from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import cors from 'cors';
import pkg from 'body-parser';
import express from 'express';
import { PubSub } from 'graphql-subscriptions';

import messages from "./controller/messages.controller.js";
import users from "./controller/user.controller.js";
import typeDefs from './schema.js';
import Mutation from "./resolvers/Mutation.js";
import Query from "./resolvers/Query.js";
import Subscription from "./resolvers/Subscription.js";

const pubsub = new PubSub();
const { json } = pkg;
const resolvers = {Mutation, Query, Subscription};
const schema = makeExecutableSchema({ typeDefs, resolvers });
const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  schema,
  introspection: true,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    ApolloServerPluginLandingPageLocalDefault(),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });
  const serverCleanup = useServer({ schema, context: pubsub }, wsServer);

await server.start();
app.use('/graphql', cors(), json(), expressMiddleware(server, {
  context: () => {return {messages, users, pubsub}}
}
));

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  
console.log(`🚀  Server ready at: 4000`);
