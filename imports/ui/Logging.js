import React, { Component } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line
import { Meteor } from 'meteor/meteor';
// eslint-disable-next-line
import { Accounts } from 'meteor/accounts-base';

const HARDCODED_PASSWORD = 'XXX';

export default class Logging extends Component {
  login = e => {
    e.preventDefault();
    // The faster way to check if the user exists, is just try to create a new one,
    // If it fails, doesn't matter, anyway we have to log him.
    Accounts.createUser(
      {
        username: this.username.value,
        password: HARDCODED_PASSWORD,
      },
      error => {
        // "Username already exists."
        if (error && error.error !== 403) {
          console.error(error);
        }
        // We log him if no other error than 403
        Meteor.loginWithPassword(this.username.value, HARDCODED_PASSWORD, error => {
          if (!error) {
            // We always need to restore the store
            this.props.client.resetStore();
          }
        });
      }
    );
  };

  render() {
    return (
      <form onSubmit={this.login}>
        <p>Welcome to Chat Exercise: </p>
        <input
          type="text"
          placeholder="Enter your chat name"
          ref={input => {
            this.username = input;
          }}
        />
        <button type="submit">Enter</button>
      </form>
    );
  }
}
/**
 * Type Validations
 */
Logging.propTypes = {
  client: PropTypes.object,
};

Logging.defaultProps = {
  client: {},
};
