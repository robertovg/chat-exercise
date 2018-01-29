import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

const chatRoomQuery = gql`
  query chatRoom($chatRoomId: String!) {
    chatRoom(chatRoomId: $chatRoomId) {
      _id
      custom
      otherUser {
        _id
        alias
      }
      messages {
        _id
        createdAt
        from
        chatRoomId
        content
      }
    }
  }
`;

const createMessageMutation = gql`
  mutation createMessage($from: String!, $chatRoomId: String!, $content: String!) {
    createMessage(from: $from, chatRoomId: $chatRoomId, content: $content) {
      _id
      createdAt
      from
      chatRoomId
      content
    }
  }
`;

class ChatRoom extends Component {
  state = {
    // We dont' need them anymore FIXME roberto to delete
    messagesLogged: [],
    messagesOther: [],
  };
  render() {
    const { chatRoom } = this.props;
    console.log(this.state.messagesLogged);
    console.log(this.state.messagesOther);
    return (
      <div>
        <h1>Chat Rooms {chatRoom._id}:</h1>
        <ul>
          <li>{chatRoom.member1}</li>
          <li>{chatRoom.member2}</li>
        </ul>
      </div>
    );
  }
}
export default compose(
  graphql(chatRoomQuery, {
    name: 'chatRoomQuery',
    options: ownProps => {
      console.log('inside createMessage', ownProps);
      return {
        variables: {
          chatRoomId: ownProps.chatRoom._id,
        },
      };
    },
  }),
  graphql(createMessageMutation, { name: 'createMessage' })
)(ChatRoom);

/**
 * Type Validations
 */
ChatRoom.propTypes = {
  chatRoom: PropTypes.object,
};

ChatRoom.defaultProps = {
  chatRoom: {},
};
