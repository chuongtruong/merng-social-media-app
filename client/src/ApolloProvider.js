// npm install @apollo/react-hooks apollo-cache-inmemory apollo-link-http apollo-client
import React from 'react'
import App from './App'
import ApolloClient from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {createHttpLink} from 'apollo-link-http'
import {ApolloProvider} from '@apollo/react-hooks'
import {setContext} from 'apollo-link-context' //help with authorization header whenever a request is send to server

const httpLink = createHttpLink({
    uri: 'http://localhost:5000'
})


const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');
    return  {
        //Authorization header
        headers: {
            Authorization: token ?  ` Bearer ${token}` : ''
    }}
})


const client = new ApolloClient({
    //3:59:42, basically, concat httpLink so that apollo will have header...
    link: authLink.concat(httpLink),
    cache: new InMemoryCache
})


export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)