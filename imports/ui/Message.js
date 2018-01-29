import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ message, isMine }) => {
  // Adding class to recognize if a message is mine or not
  const classes = ['message'];
  if (isMine) {
    classes.push('isMine');
  } else {
    classes.push('isOther');
  }
  return (
    <div className={classes.join(' ')}>
      <div className="content">{message.content}</div>
    </div>
  );
};
export default Message;
/**
 * Type Validations
 */
Message.propTypes = {
  message: PropTypes.object,
  isMine: PropTypes.bool,
};

Message.defaultProps = {
  message: {},
  isMine: true,
};
