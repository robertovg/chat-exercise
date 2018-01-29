import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
// eslint-disable-next-line
import { Meteor } from 'meteor/meteor';

export default class LoggedApp extends Component {
  // Meteor.users.find().fetch(); --> returns all logged users
  state = { talkingWith: '' };

  componentWillMount() {
    const SUBSCRIBE_USER_RANDOM_CHANGES = gql`
      subscription justCreatedUser {
        justCreatedUser {
          _id
          alias
        }
      }
    `;

    this.props.data.subscribeToMore({
      document: SUBSCRIBE_USER_RANDOM_CHANGES,
      updateQuery: (prev, { subscriptionData }) => {
        console.log('updateQuery', prev, subscriptionData);
        // We need to return the same shape of data to show the new users
        return {
          ...prev,
          users: [...prev.users, subscriptionData.data.justCreatedUser],
        };
      },
    });
  }

  handleChange(event) {
    this.setState({ talkingWith: event.target.value });
    // Fire talkingWith
  }

  logout = () => {
    Meteor.logout();
    this.props.client.resetStore();
  };

  render() {
    console.log('reloading');
    const { user, users = [] } = this.props.data;

    return (
      <header>
        <p>Hi {user.alias}</p>
        <label>
          <select value={this.state.talkingWith} onChange={e => this.handleChange(e)}>
            {users.filter(e => e._id !== user._id).map(e => (
              <option key={e._id} value={e._id}>
                {e.alias}
              </option>
            ))}
            <option value="">Pick someone to talk to:</option>
          </select>
        </label>

        <ul>{}</ul>
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
