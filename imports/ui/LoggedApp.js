import React, { Component } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line
import { Meteor } from 'meteor/meteor';

export default class LoggedApp extends Component {
  // Meteor.users.find().fetch(); --> returns all logged users

  logout = () => {
    Meteor.logout();
    this.props.client.resetStore();
  };

  render() {
    const { user } = this.props.data;
    return (
      <header>
        <p>Hi {user.alias}</p>
        <button
          onClick={() => {
            this.logout();
          }}
        >
          Logout
        </button>
      </header>
    );
  }
}

/**
 * Type Validations
 */
LoggedApp.propTypes = {
  client: PropTypes.object,
  data: PropTypes.object,
};

LoggedApp.defaultProps = {
  client: {},
  data: {},
};
