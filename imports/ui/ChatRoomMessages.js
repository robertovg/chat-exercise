import React from 'react';
import PropTypes from 'prop-types';

const ChatRoomMessages = ({ messages }) => (
  <section className="loggedBody--messages">
    {messages.length ? (
      messages.map(e => <div key={e._id}>{e.content}</div>)
    ) : (
      <p>No messages yet, start writing</p>
    )}
  </section>
);
export default ChatRoomMessages;
/**
 * Type Validations
 */
ChatRoomMessages.propTypes = {
  messages: PropTypes.array,
};

ChatRoomMessages.defaultProps = {
  messages: [],
};
