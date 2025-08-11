import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { Platform } from 'react-native';

const uri = 'http://192.168.0.12:4000/graphql';

const httpLink = new HttpLink({ uri });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;

export const countriesApi = new ApolloClient({
  uri: 'https://countries.trevorblades.com/',
  cache: new InMemoryCache(),
});