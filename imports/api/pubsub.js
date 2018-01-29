// eslint-disable-next-line
import { Meteor } from 'meteor/meteor';
// eslint-disable-next-line
import { Accounts } from 'meteor/accounts-base';
import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();
export const newUserEvent = 'NEW_USER_EVENT';
// right now we will send all events to everyone,
// TODO roberto but should think on how to subscribe per chat
export const newMessageEvent = 'NEW_MESSAGE_EVENT';

/*
 * Event to finish of connecting the subscriptions
 */
// Was just for tests
// Meteor.setInterval(() => {
//   pubsub.publish(newMessageEvent, {
//     justCreatedMessage: {},
//   });
// }, 1000);

Accounts.onCreateUser((options, user) => {
  pubsub.publish(newUserEvent, { justCreatedUser: user });
  return user;
});
