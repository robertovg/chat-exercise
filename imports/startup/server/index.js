// eslint-disable-next-line
import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';

// import UserSchema from '../../api/user/User.graphql';
// import UserResolvers from '../../api/user/resolvers';

const typeDefs = `
type User {
  _id: String
  name: String
}

type Query {
  user: User
}
`;

const resolvers = {
  Query: {
    user(obj, args, { user }) {
      return user || {};
    },
  },
};

const schema = makeExecutableSchema({
  // typeDefs: UserSchema,
  // resolvers: UserResolvers,
  typeDefs,
  resolvers,
});

createApolloServer({ schema });
