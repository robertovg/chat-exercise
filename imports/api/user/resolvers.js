// eslint-disable-next-line
import { Meteor } from 'meteor/meteor';
// eslint-disable-next-line
import { Accounts } from 'meteor/accounts-base';
import { pubsub, newUserEvent } from '../pubsub';

export default {
  User: {
    alias: user => user.username,
  },

  Query: {
    user(obj, args, { userId }) {
      // Since I installed swydo:ddp-apollo, I don't have the user
      // in the context anymore, so fetching it.
      const user = Meteor.users.find({ _id: userId }).fetch()[0];
      return user || {};
    },
    users(obj, args, context) {
      return Meteor.users.find().fetch();
    },
  },

  Subscription: {
    justCreatedUser: {
      subscribe: () => pubsub.asyncIterator(newUserEvent),
    },
  },
};
