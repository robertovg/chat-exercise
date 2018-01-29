// eslint-disable-next-line
import { Meteor } from 'meteor/meteor';
// eslint-disable-next-line
import { Accounts } from 'meteor/accounts-base';
import { pubsub, NEW_USER_EVENT } from '../pubsub';

export default {
  Query: {
    users(obj, args, context) {
      return Meteor.users.find().fetch();
    },
  },

  Subscription: {
    justCreatedUser: {
      subscribe: () => pubsub.asyncIterator(NEW_USER_EVENT),
    },
  },
};
