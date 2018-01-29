import Message from './message';
import { pubsub, newMessageEvent } from '../pubsub';

export default {
  Mutation: {
    createMessage(obj, { from, chatRoomId, content }) {
      const messageId = Message.insert({
        from,
        chatRoomId,
        content,
        createdAt: `${+new Date()}`,
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
      subscribe: () => pubsub.asyncIterator(newMessageEvent),
    },
  },
};
