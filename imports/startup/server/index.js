// eslint-disable-next-line
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
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

// ass

const schema = makeExecutableSchema({
  typeDefs: [UsersSchema, UserSchema],
  resolvers: merge(UsersResolvers, UserResolvers),
});
// Just creating a meteor server instance with apollo and injecting the schemas and resolvers
createApolloServer({ schema });
