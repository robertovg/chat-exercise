// eslint-disable-next-line
import { setup as createApolloServer } from 'meteor/swydo:ddp-apollo';
import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash/merge';

// Schemas and Resolvers for our api
import UserSchema from '../../api/user/User.graphql';
import UserResolvers from '../../api/user/resolvers';
import ChatRoomSchema from '../../api/chatRoom/ChatRoom.graphql';
import ChatRoomResolvers from '../../api/chatRoom/resolvers';

const schema = makeExecutableSchema({
  typeDefs: [UserSchema, ChatRoomSchema],
  resolvers: merge(UserResolvers, ChatRoomResolvers),
});

// Just creating a meteor server instance with apollo and injecting the schemas and resolvers
// Now login, links and ws are managed by swydo:ddp-apollo
createApolloServer({ schema });

// 3sss
