import React from 'react';
// eslint-disable-next-line
import { Meteor } from 'meteor/meteor';
// eslint-disable-next-line
import { Accounts } from 'meteor/accounts-base';
import { render } from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink, from } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SubscriptionClient } from 'subscriptions-transport-ws';

import App from '../../ui/App';

const httpLink = new HttpLink({
  uri: Meteor.absoluteUrl('graphql'),
});

// create a websocket uri based on your app absolute url (ROOT_URL), ex: ws://localhost:3000
const websocketUri = Meteor.absoluteUrl('subscriptions').replace(/^http/, 'ws');

// Create WebSocket client
const wsClient = new SubscriptionClient(websocketUri, {
  reconnect: true,
});

const wsLink = new WebSocketLink(wsClient);

const authLink = new ApolloLink((operation, forward) => {
  const token = Accounts._storedLoginToken();
  operation.setContext(() => ({
    headers: {
      'meteor-login-token': token,
    },
  }));
  return forward(operation);
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: from([authLink, httpLink, wsLink]),
  cache,
});

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

Meteor.startup(() => {
  render(<ApolloApp />, document.getElementById('app'));
});
