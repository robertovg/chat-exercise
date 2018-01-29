// eslint-disable-next-line
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { PubSub, SubscriptionManager } from 'graphql-subscriptions';
import merge from 'lodash/merge';

// eslint-disable-next-line
import { Meteor } from 'meteor/meteor';
// eslint-disable-next-line
import { Accounts } from 'meteor/accounts-base';
// eslint-disable-next-line
import { WebApp } from 'meteor/webapp';

// Schemas and Resolvers for our api
import UserSchema from '../../api/user/User.graphql';
import UserResolvers from '../../api/user/resolvers';
import UsersSchema from '../../api/users/Users.graphql';
import UsersResolvers from '../../api/users/resolvers';

// the pubsub mechanism of your choice, for instance:
// - PubSub from graphql-subscriptions (not recommended for production)
// - RedisPubSub from graphql-redis-subscriptions
// - MQTTPubSub from graphql-mqtt-subscriptions
const pubsub = new PubSub();

// subscriptions path which fits with the one you connect to on the client
const subscriptionsPath = '/subscriptions';

const schema = makeExecutableSchema({
  typeDefs: [UsersSchema, UserSchema],
  resolvers: merge(UsersResolvers, UserResolvers),
});

// Just creating a meteor server instance with apollo and injecting the schemas and resolvers
createApolloServer({ schema });

// create the subscription manager thanks to the schema & the pubsub mechanism
const subscriptionManager = new SubscriptionManager({
  schema,
  pubsub,
});

// start up a subscription server
// I know I should not use ""'new' for side effects. (eslint no-new)" ...
// But with the last version of subscriptions-transport-ws doesn't work (to investigate)
// eslint-disable-next-line
new SubscriptionServer(
  {
    subscriptionManager,
  },
  {
    // bind the subscription server to Meteor WebApp
    server: WebApp.httpServer,
    path: subscriptionsPath,
  }
);
// ah
