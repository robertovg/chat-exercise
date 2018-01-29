// eslint-disable-next-line
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';

// eslint-disable-next-line
import { Meteor } from 'meteor/meteor';
// eslint-disable-next-line
import { Accounts } from 'meteor/accounts-base';

import UserSchema from '../../api/user/User.graphql';
import UserResolvers from '../../api/user/resolvers';

// as

const schema = makeExecutableSchema({
  typeDefs: [UserSchema],
  resolvers: UserResolvers,
});
// Just creating a meteor server instance with apollo and injecting the schemas and resolvers
createApolloServer({ schema });
