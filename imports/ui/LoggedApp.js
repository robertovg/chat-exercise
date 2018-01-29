import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
// eslint-disable-next-line
import { Meteor } from 'meteor/meteor';
import ChatRoom from './ChatRoom';

const subscribeUserChanges = gql`
  subscription justCreatedUser {
    justCreatedUser {
      _id
      alias
    }
  }
`;

const createChatRoomMutation = gql`
  mutation createChatRoom($member1: String!, $member2: String!) {
    createChatRoom(member1: $member1, member2: $member2) {
      _id
      member1
      member2
    }
  }
`;

class LoggedApp extends Component {
  // Meteor.users.find().fetch(); --> returns all logged users
  state = { talkingWith: '', chatRoom: {} };

  componentWillMount() {
    this.props.data.subscribeToMore({
      document: subscribeUserChanges,
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
    const talkingWith = event.target.value;
    if (!talkingWith) return null;
    this.setState({ talkingWith });
    this.props
      .createChatRoom({
        variables: {
          member1: this.props.data.user._id,
          member2: talkingWith,
        },
      })
      .then(e => {
        const chatRoom = e.data.createChatRoom;
        this.setState({ talkingWith, chatRoom });
      })
      .catch(error => {
        console.error(error);
      });
  }

  logout = () => {
    Meteor.logout();
    this.props.client.resetStore();
  };

  render() {
    const { user, users = [] } = this.props.data;

    return (
      <div className="logged">
        <header className="logged--header">
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

          <button
            onClick={() => {
              this.logout();
            }}
          >
            Logout
          </button>
        </header>
        {this.state.chatRoom._id ? (
          <ChatRoom chatRoomParam={this.state.chatRoom} loggedUser={user} />
        ) : (
          <p>Select one person to talk with</p>
        )}
      </div>
    );
  }
}
export default graphql(createChatRoomMutation, { name: 'createChatRoom' })(LoggedApp);
/**
 * Type Validations
 */
LoggedApp.propTypes = {
  client: PropTypes.object,
  data: PropTypes.object,
  createChatRoom: PropTypes.func,
};

LoggedApp.defaultProps = {
  client: {},
  data: {},
  createChatRoom() {},
};
