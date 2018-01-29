// eslint-disable-next-line
import { Meteor } from 'meteor/meteor';

export default {
  Query: {
    users(obj, args, context) {
      return Meteor.users.find().fetch();
    },
  },
};
