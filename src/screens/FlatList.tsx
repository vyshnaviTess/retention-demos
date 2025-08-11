import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

interface Message {
    id: string;
    text: string;
    sender: 'user'|'system';
}
const messages: Message[] = [
    { id: '1', text: 'Hello!', sender: 'user' },
    { id: '2', text: 'Hi there!', sender: 'system' },
    { id: '3', text: 'How are you?', sender: 'user' },
    { id: '4', text: 'I am fine, thank you!', sender: 'system' },
];

export default function MessagesList() {
    const renderItem = ({ item }: {item: Message}) => (
        <View 
        style = {[styles.messageBubble, item.sender === 'user' ? styles.userBubble : styles.systemBubble]}
        >
            <Text style={styles.messageText}>{item.text}</Text>
        </View>
    );
    return (
       <FlatList
      data={messages}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
    );
};


const styles = StyleSheet.create({
  messageBubble: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 8,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  systemBubble: {
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
});

