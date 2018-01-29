import React from 'react';
import PropTypes from 'prop-types';

export const specialTypes = {
  think: 'think',
  highlight: 'highlight',
};
const Message = ({ message, isMine }) => {
  // Adding class to recognize if a message is mine or not
  const classes = ['message'];
  if (isMine) {
    classes.push('isMine');
  } else {
    classes.push('isOther');
  }

  if (message.specialType) {
    switch (message.specialType) {
      case specialTypes.think:
        classes.push('message--think');
        break;
      case specialTypes.highlight:
        classes.push('message--highlight');
        break;
      default:
        // nothing to do here...
        break;
    }
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
