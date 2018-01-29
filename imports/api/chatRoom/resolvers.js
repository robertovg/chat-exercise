// eslint-disable-next-line
import { Meteor } from 'meteor/meteor';
// eslint-disable-next-line
import { Accounts } from 'meteor/accounts-base';
import ChatRoom from './chatRoom';
import Message from '../message/message';

export default {
  ChatRoom: {
    otherUser: (chatRoomOwn, context) => {
      console.log('inside otherUser', chatRoomOwn, context);
      const loggedUserId = Accounts.userId();
      const otherUserId = chatRoomOwn.member1 === loggedUserId ? chatRoomOwn.member2 : loggedUserId;

      console.log(otherUserId);
      return Meteor.users.findOne(otherUserId);
    },
    messages: chatRoom => {
      console.log('inside message');
      return Message.find({ from: chatRoom.member1 }).fetch();
    },
  },
  Query: {
    chatRoom(obj, { chatRoomId }) {
      console.log(`inside message ${chatRoomId}`);
      const result = ChatRoom.findOne({ _id: chatRoomId });
      console.log(result);
      return result || {};
    },
  },
  Mutation: {
    createChatRoom(obj, { member1, member2 }) {
      let chatRoomId;
      // I know this is not the cleanest approach, but easy wy to create
      // a chat room in case doesn't exists.
      let searchResult = ChatRoom.findOne({
        member1,
        member2,
      });
      // If is not found, I search now by the opposite
      // In case the member2 was saved in the one.
      if (!searchResult) {
        searchResult = ChatRoom.findOne({
          member1: member2,
          member2: member1,
        });
      }
      if (!searchResult) {
        chatRoomId = ChatRoom.insert({
          member1,
          member2,
        });
        return ChatRoom.findOne(chatRoomId);
      }
      return searchResult;
    },
  },
};
