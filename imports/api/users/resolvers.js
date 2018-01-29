// eslint-disable-next-line
import { Meteor } from 'meteor/meteor';
import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();

const SOMETHING_CHANGED_TOPIC = 'something_changed';

export default {
  Query: {
    users(obj, args, context) {
      return Meteor.users.find().fetch();
    },
  },

  Subscription: {
    newUser: {
      subscribe: () => {
        // TODO change to real new user
        console.log('inside somethingChanged');
        return pubsub.asyncIterator(SOMETHING_CHANGED_TOPIC);
      },
    },
  },
};
