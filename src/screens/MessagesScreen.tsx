import React, { useState } from 'react';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
} from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const GET_MESSAGES = gql`
  query {
    messages {
      id
      text
      sender
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation ($text: String!) {
    sendMessage(text: $text) {
      id
      text
      sender
    }
  }
`;

export default function MessagesScreen() {
  const insets = useSafeAreaInsets(); // 👈 get safe area insets
  const { data } = useQuery(GET_MESSAGES, { pollInterval: 2000 });
  const [sendMessage] = useMutation(SEND_MESSAGE);
  const [text, setText] = useState('');

  const onSend = async () => {
    if (!text.trim()) return;
    await sendMessage({ variables: { text } }).catch(() => {});
    setText('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <FlatList
          data={data?.messages ?? []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Text style={{ color: item.sender === 'user' ? 'blue' : 'green' }}>
              {item.sender}: {item.text}
            </Text>
          )}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 12 }}
          ListEmptyComponent={<Text>No messages yet</Text>}
        />

        <View style={[styles.inputRow, { paddingBottom: insets.bottom || 8 }]}>
          <TextInput
            style={styles.input}
            placeholder="Type a message"
            value={text}
            onChangeText={setText}
            multiline
          />
          <Button title="Send" onPress={onSend} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginRight: 8,
    maxHeight: 100,
  },
});
