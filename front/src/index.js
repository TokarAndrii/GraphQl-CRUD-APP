import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route } from 'react-router-dom';

const client = new ApolloClient({
    uri: 'http://localhost:3003/graphql'
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <BrowserRouter>
            <Route component={App} />
        </BrowserRouter>
    </ApolloProvider>, document.getElementById('root')
);


serviceWorker.unregister();
