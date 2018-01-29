import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { specialTypes } from './Message';
import ChatRoomMessages from './ChatRoomMessages';

// Won't have time for all of them. But not really big deals to finish...
const commands = {
  nick: '/nick',
  think: '/think',
  oops: '/oops',
  highlight: '/highlight',
};
const subscribeMessageChanges = gql`
  subscription justCreatedMessage {
    justCreatedMessage {
      _id
      createdAt
      from
      chatRoomId
      content
      specialType
    }
  }
`;

const chatRoomQuery = gql`
  query chatRoom($chatRoomId: String!) {
    chatRoom(chatRoomId: $chatRoomId) {
      _id
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
        specialType
      }
    }
  }
`;

const createMessageMutation = gql`
  mutation createMessage(
    $from: String!
    $chatRoomId: String!
    $content: String!
    $specialType: String
  ) {
    createMessage(
      from: $from
      chatRoomId: $chatRoomId
      content: $content
      specialType: $specialType
    ) {
      _id
      createdAt
      from
      chatRoomId
      content
      specialType
    }
  }
`;

class ChatRoom extends Component {
  state = {
    userInput: '',
    disabled: false,
  };

  componentWillMount() {
    this.props.chatRoomData.subscribeToMore({
      document: subscribeMessageChanges,
      updateQuery: (prev, { subscriptionData }) => {
        console.log('updateQuery', prev, subscriptionData);
        // We need to return the same shape of data with the new message
        return {
          ...prev,
          chatRoom: {
            ...prev.chatRoom,
            messages: [...prev.chatRoom.messages, subscriptionData.data.justCreatedMessage],
          },
        };
      },
    });
  }
  /**
   * Moving the logic of Message creation to a diferent function
   */
  createTheMessage(from, chatRoomId, content, specialType) {
    return new Promise((resolve, reject) => {
      // call the mutation
      this.props
        .createMessage({
          variables: {
            from,
            chatRoomId,
            content,
            specialType,
          },
        })
        .then(e => {
          resolve(e);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  handleMessageSubmission(event) {
    event.preventDefault();
    // To avoid double submission
    if (this.state.disabled) {
      return null;
    }
    this.setState({
      disabled: true,
    });
    const { loggedUser, chatRoomData } = this.props;
    // Put here a function to deal with special commands
    let messageContent = this.state.userInput;
    let specialTypeParam;
    if (messageContent.startsWith(commands.think)) {
      specialTypeParam = specialTypes.think;
      messageContent = messageContent.replace(commands.think, '');
    }
    if (messageContent.startsWith(commands.highlight)) {
      specialTypeParam = specialTypes.highlight;
      messageContent = messageContent.replace(commands.highlight, '');
    }
    // I think is a good practice not only trim when commands, but always
    messageContent = messageContent.trim();

    this.createTheMessage(
      loggedUser._id,
      chatRoomData.chatRoom._id,
      messageContent,
      specialTypeParam
    )
      .then(e => {
        console.log(e);
        // I don't do anything with the new message because I want to subscribe
        // any new message instead.
        this.setState({
          userInput: '',
          disabled: false,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleUserInputChange(event) {
    // Here I should inform I'm writing...
    this.setState({
      userInput: event.target.value,
    });
  }

  render() {
    const { chatRoomData, loggedUser } = this.props;
    if (chatRoomData.loading) return null;
    return (
      <div className="loggedBody">
        <section className="loggedBody--chatTitle">
          Chat between {loggedUser.alias} && {chatRoomData.chatRoom.otherUser.alias}
        </section>
        <ChatRoomMessages messages={chatRoomData.chatRoom.messages} loggedUser={loggedUser} />
        <form className="loggedBody--userInput" onSubmit={e => this.handleMessageSubmission(e)}>
          <input
            value={this.state.userInput}
            onChange={e => this.handleUserInputChange(e)}
            disabled={this.state.disabled}
            placeholder="write something"
          />
        </form>
      </div>
    );
  }
}

export default compose(
  graphql(chatRoomQuery, {
    name: 'chatRoomData',
    options: ownProps => ({
      variables: {
        chatRoomId: ownProps.chatRoomParam._id,
      },
    }),
  }),
  graphql(createMessageMutation, { name: 'createMessage' })
)(ChatRoom);

/**
 * Type Validations
 */
ChatRoom.propTypes = {
  // It's used but in the query... eslint should be smarter
  // eslint-disable-next-line
  chatRoomParam: PropTypes.object,
  chatRoomData: PropTypes.object,
  loggedUser: PropTypes.object,
  createMessage: PropTypes.func,
};

ChatRoom.defaultProps = {
  chatRoomParam: {},
  chatRoomData: {},
  loggedUser: {},
  createMessage() {},
};
