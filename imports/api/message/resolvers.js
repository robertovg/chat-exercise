import Message from './message';

export default {
  Mutation: {
    createMessage(obj, { from, chatRoomId, content }) {
      console.log('createMessage', from, chatRoomId, content);
      const messageId = Message.insert({
        from,
        chatRoomId,
        content,
        createdAt: `${+new Date()}`,
      });
      return Message.findOne(messageId);
    },
  },
};
