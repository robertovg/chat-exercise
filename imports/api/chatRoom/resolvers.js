import ChatRoom from './chatRoom';

export default {
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
