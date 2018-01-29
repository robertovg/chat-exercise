// eslint-disable-next-line
import { Accounts } from 'meteor/accounts-base';
export default {
  Query: {
    user(obj, args, { user }) {
      console.log(user);
      return user || {};
    },
  },
  User: {
    alias: user => user.username,
  },
};
