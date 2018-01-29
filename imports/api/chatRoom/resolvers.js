// eslint-disable-next-line
import { Meteor } from 'meteor/meteor';
// eslint-disable-next-line
import { Accounts } from 'meteor/accounts-base';
import ChatRoom from './chatRoom';
import Message from '../message/message';

export default {
  ChatRoom: {
    otherUser: (chatRoomOwn, context) => {
      const loggedUserId = Accounts.userId();
      const otherUserId = chatRoomOwn.member1 === loggedUserId ? chatRoomOwn.member2 : loggedUserId;
      const result = Meteor.users.findOne(otherUserId);
      return result;
    },
    messages: chatRoom => {
      const result = Message.find({ chatRoomId: chatRoom._id }).fetch();
      return result;
    },
  },
  Query: {
    chatRoom(obj, { chatRoomId }) {
      const result = ChatRoom.findOne({ _id: chatRoomId });
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
