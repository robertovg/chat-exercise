import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
// eslint-disable-next-line
import { Meteor } from 'meteor/meteor';

export default class LoggedApp extends Component {
  // Meteor.users.find().fetch(); --> returns all logged users
  state = { talkingWith: '' };

  componentWillMount() {
    this.props.data.subscribeToMore({
      document: gql`
        subscription newUser {
          user {
            _id
            alias
          }
        }
      `,
      // variables: {
      //   channelId: this.props.match.params.channelId,
      // },
      updateQuery: (prev, { subscriptionData }) => {
        console.log('updateQuery');
        return prev;
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
