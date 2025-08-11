import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export const SUBMIT_CHECKIN = gql`
  mutation SubmitCheckIn($mood: String!) {
    submitCheckIn(mood: $mood) {
      id
      date
      mood
    }
  }
`;

type RootStackParamList = {
  CheckIn: undefined;
  Progress: undefined;
  Messages: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'CheckIn'>;

export default function CheckInScreen({ navigation }: Props) {
  const [mood, setMood] = useState<string | null>(null);
  const [submitCheckIn, { loading }] = useMutation(SUBMIT_CHECKIN);

  const handle = (m: string) => {
    setMood(m);
    submitCheckIn({
      variables: { mood: m },
      optimisticResponse: {
        submitCheckIn: { id: `temp-${Date.now()}`, date: new Date().toISOString(), mood: m, __typename: 'CheckIn' }
      }
    }).catch(() => {});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling today?</Text>
      <View style={styles.row}>
        {['😊', '😐', '😢'].map(e => (
          <View key={e} style={styles.button}>
            <Button title={e} onPress={() => handle(e)} disabled={loading} />
          </View>
        ))}
      </View>
      {mood && <Text style={styles.feedback}>You checked in with: {mood}</Text>}

      {/* Navigation buttons */}
      <View style={styles.navRow}>
        <Button title="Go to Progress" onPress={() => navigation.navigate('Progress')} />
        <Button title="Go to Messages" onPress={() => navigation.navigate('Messages')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, alignItems: 'center' },
  title: { fontSize: 18, marginBottom: 16 },
  row: { flexDirection: 'row', gap: 8 },
  button: { marginHorizontal: 8 },
  feedback: { marginTop: 16 },
  navRow: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 40, width: '100%' }
});
