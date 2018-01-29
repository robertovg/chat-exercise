export default {
  Query: {
    user(obj, args, { user }) {
      return user || {};
    },
  },
  User: {
    alias: user => user.username,
  },
};
