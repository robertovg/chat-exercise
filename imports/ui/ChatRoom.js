import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ChatRoom extends Component {
  state = {
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
          <li>{chatRoom.component1}</li>
          <li>{chatRoom.component2}</li>
        </ul>
      </div>
    );
  }
}
// load the messages for the two users when this components is loded
export default ChatRoom;

/**
 * Type Validations
 */
ChatRoom.propTypes = {
  chatRoom: PropTypes.object,
};

ChatRoom.defaultProps = {
  chatRoom: {},
};
