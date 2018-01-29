import ChatRoom from './chatRoom';
import Message from '../message/message';

export default {
  Query: {
    chatRoom(obj, { chatRoomId }) {
      return ChatRoom.findOne({
        chatRoomId,
      }).fetch();
    },
  },
  ChatRoom: {
    messagesLogged: (chatRoom, context) => {
      console.log('messagesLogged', chatRoom, context);
      const otherId =
        chatRoom.component1 === context.userId ? chatRoom.component1 : chatRoom.component2;
      // Message.find({ from: mess });
      // Not sure if I have userId available. if not just load messagesComponent1 and
      // messagesComponent2 and asing in the component
      return [];
    },

    messagesOther: (chatRoom, context) => {
      console.log('messagesLogged', chatRoom, context);
      const otherId =
        chatRoom.component1 === context.userId ? chatRoom.component1 : chatRoom.component2;
      // Message.find({ from: mess });
      return [];
    },
  },
  Mutation: {
    createChatRoom(obj, { component1, component2 }) {
      let chatRoomId;
      // I know this is not the cleanest approach, but easy wy to create
      // a chat room in case doesn't exists.
      console.log('first search', component1, component2);
      let searchResult = ChatRoom.findOne({
        component1,
        component2,
      });
      // If is not found, I search now by the opposite
      // In case the component2 was saved in the one.
      if (!searchResult) {
        console.log('second search');
        searchResult = ChatRoom.findOne({
          component1: component2,
          component2: component1,
        });
      }
      if (!searchResult) {
        console.log('insert');
        chatRoomId = ChatRoom.insert({
          component1,
          component2,
        });
        return ChatRoom.findOne(chatRoomId);
      }
      return searchResult;
    },
  },
};
