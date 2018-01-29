// eslint-disable-next-line
import { Meteor } from 'meteor/meteor';

export default {
  Query: {
    user(obj, args, { userId }) {
      // Since I installed swydo:ddp-apollo, I don't have the user in the context anymore, so fetching it.
      const user = Meteor.users.find({ _id: userId }).fetch()[0];
      return user || {};
    },
  },
  User: {
    alias: user => user.username,
  },
};
