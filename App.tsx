import 'react-native-gesture-handler';
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client, { countriesApi } from './src/graphql/client';
import RootStack from './src/Navigation/RootStack';
import MoodTracker from './src/screens/MoodTracker';
import FlatList from './src/screens/FlatList';
import CountryList from './src/screens/CountryList';
import { View } from 'react-native';
import PostsScreen from './src/screens/PostsScreen';



export default function App() {

  // return <PostsScreen />;
  //   <ApolloProvider client={countriesApi}>
  //     <View style={{ flex: 1, paddingTop: 50 }}>
  //       <CountryList />
  //     </View>
  //   </ApolloProvider>
  // );

  // return<CountryList /> ;

  return (
    <ApolloProvider client={client}>
      <RootStack />
    </ApolloProvider>
  );
}
