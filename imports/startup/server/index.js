// eslint-disable-next-line
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import { createServer } from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { PubSub, SubscriptionManager } from 'graphql-subscriptions';
// asdf
import { execute, subscribe } from 'graphql';
import merge from 'lodash/merge';

// eslint-disable-next-line
import { Meteor } from 'meteor/meteor';
// eslint-disable-next-line
import { Accounts } from 'meteor/accounts-base';

// Schemas and Resolvers for our api
import UserSchema from '../../api/user/User.graphql';
import UserResolvers from '../../api/user/resolvers';
import UsersSchema from '../../api/users/Users.graphql';
import UsersResolvers from '../../api/users/resolvers';

// Initialize GraphQL subscriptions
const pubsub = new PubSub();

const schema = makeExecutableSchema({
  typeDefs: [UsersSchema, UserSchema],
  resolvers: merge(UsersResolvers, UserResolvers),
});

const subscriptionManager = new SubscriptionManager({ schema, pubsub });
// Just creating a meteor server instance with apollo and injecting the schemas and resolvers
createApolloServer({ schema });

const WS_PORT = 5000;

// Create WebSocket listener server
const websocketServer = createServer((request, response) => {
  response.writeHead(404);
  response.end();
});

// Bind it to port and start listening
websocketServer.listen(WS_PORT, () =>
  console.log(`Websocket Server is now running on http://localhost:${WS_PORT}`)
);

const subscriptionServer = SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe,
  },
  {
    server: websocketServer,
    path: '/graphql',
  }
);
