import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { gql, useQuery } from '@apollo/client';

const GET_PROGRESS = gql`
  query GetProgress {
    progress {
      week
      completedCheckIns
    }
  }
`;

export default function ProgressScreen({ navigation }: any) {
  const { data, loading, error, refetch } = useQuery(GET_PROGRESS);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Progress</Text>

      {loading && <Text>Loading...</Text>}

      {error && (
        <View>
          <Text style={styles.error}>Error loading progress — {error.message}</Text>
          <Button title="Retry" onPress={() => refetch()} />
        </View>
      )}

      {!loading && !error && (
        <>
          {data?.progress?.length === 0 ? (
            <Text>No progress yet — try checking in today!</Text>
          ) : (
            data.progress.map((p: any) => (
              <Text key={p.week}>
                Week {p.week}: {p.completedCheckIns} check-ins
              </Text>
            ))
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  error: { color: 'red', marginBottom: 8 }
});
