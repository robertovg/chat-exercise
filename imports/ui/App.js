import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line
import { Meteor } from 'meteor/meteor';
import gql from 'graphql-tag';
import { graphql, withApollo } from 'react-apollo';

import LoggedApp from './LoggedApp';
import Logging from './Logging';

import './App.css';

const App = props => {
  const { data, client } = props;
  // Skipping the execution if data is not loaded
  if (data.loading) return null;
  // We show the LoggedApp  or Logging one depending if the user is logged
  return data.user._id ? <LoggedApp {...props} /> : <Logging client={client} />;
};

const userQuery = gql`
  query User {
    user {
      _id
      alias
    }
    users {
      _id
      alias
    }
  }
`;

export default graphql(userQuery)(withApollo(App));
/**
 * Type Validations
 */
App.propTypes = {
  data: PropTypes.object,
  client: PropTypes.object,
};

App.defaultProps = {
  data: {},
  client: {},
};
