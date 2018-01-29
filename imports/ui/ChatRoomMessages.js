import React from 'react';
import PropTypes from 'prop-types';

import Message from './Message';

const ChatRoomMessages = ({ messages, loggedUser }) => (
  <section className="loggedBody--messages">
    {messages.length ? (
      messages.map(e => <Message key={e._id} message={e} isMine={e.from === loggedUser._id} />)
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
  loggedUser: PropTypes.object,
};

ChatRoomMessages.defaultProps = {
  messages: [],
  loggedUser: PropTypes.object,
};
