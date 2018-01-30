import { withFilter } from 'graphql-subscriptions';
import Message from './message';
import { pubsub, newMessageEvent } from '../pubsub';

export default {
  Mutation: {
    createMessage(obj, { from, chatRoomId, content, specialType }) {
      const messageId = Message.insert({
        from,
        chatRoomId,
        content,
        createdAt: `${+new Date()}`,
        specialType,
      });
      // Each time we create a new user, we publish it
      const newMessage = Message.findOne(messageId);
      pubsub.publish(newMessageEvent, {
        justCreatedMessage: newMessage,
      });
      return newMessage;
    },
  },
  Subscription: {
    justCreatedMessage: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(newMessageEvent),
        (payload = {}, variables = {}) => {
          // This makes only the subscriptions when both are in the same chatRoom
          const { justCreatedMessage } = payload;
          const { chatRoomId = '' } = justCreatedMessage;
          return chatRoomId === variables.chatRoomId;
        }
      ),
    },
  },
};
