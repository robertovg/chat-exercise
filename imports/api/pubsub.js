// eslint-disable-next-line
import { Meteor } from 'meteor/meteor';
// eslint-disable-next-line
import { Accounts } from 'meteor/accounts-base';
import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();
export const NEW_USER_EVENT = 'NEW_USER_EVENT';

/*
 * Event to finish of connecting the subscriptions
 */
// Was just for tests
// Meteor.setInterval(() => {
//   pubsub.publish(NEW_USER_EVENT, {
//     userChange: Meteor.users.findOne(),
//   });
// }, 1000);

Accounts.onCreateUser((options, user) => {
  pubsub.publish(NEW_USER_EVENT, { justCreatedUser: user });
  return user;
});
