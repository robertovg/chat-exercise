// eslint-disable-next-line
import { Meteor } from 'meteor/meteor';
// eslint-disable-next-line
import { DDPLink } from 'meteor/swydo:ddp-apollo';
import { render } from 'react-dom';
import React from 'react';

import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import App from '../../ui/App';

const client = new ApolloClient({
  link: new DDPLink(),
  cache: new InMemoryCache(),
});

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

Meteor.startup(() => {
  render(<ApolloApp />, document.getElementById('app'));
});
