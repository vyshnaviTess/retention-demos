import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

enum Mood {
  HAPPY = 'happy',
  SAD = 'sad',
  ANGRY = 'angry',
  NEUTRAL = 'neutral',
}
interface CheckIn {
    id: string;
    mood: Mood;
    date: string;
}
export default function MoodTracker() {
 const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
 const [checkIns, setCheckIns] = useState<CheckIn[]>([]);

 const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    const newCheckIn: CheckIn = {
      id: Date.now().toString(),
      mood,
      date: new Date().toISOString(),
 };
 setCheckIns((prev) => [...prev, newCheckIn]);  
};

return (
<View style={styles.container}>
    <Text style={styles.title}>Select Your Mood</Text>
    <View style={styles.buttonContainer}>
        {Object.values(Mood).map((mood) => (
            <TouchableOpacity
            key={mood}
            style={[
                styles.button,
                selectedMood === mood && styles.buttonSelected,
            ]}
            onPress={() => handleMoodSelect(mood)}
            >
                <Text style={styles.buttonText}>{mood}</Text>
            </TouchableOpacity>
        ))}
    </View>
    {selectedMood && (
        <Text style={styles.selectedText}>You feel: {selectedMood}</Text>
    )}
    <View style={styles.history}>
        <Text style={styles.historyTitle}>Check-In History:</Text>
        {checkIns.map((checkIn) => (
            <Text key={checkIn.id}>
                {checkIn.date.split('T')[0]} - {checkIn.mood}
            </Text>
        ))}
        </View>
</View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#ddd',
  },
  buttonSelected: {
    backgroundColor: '#4cafef',
  },
  buttonText: {
    fontSize: 16,
  },
  selectedText: {
    textAlign: 'center',
    fontSize: 18,
    marginVertical: 10,
  },
  history: {
    marginTop: 20,
  },
  historyTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});


// enum Mood {
//   HAPPY = 'Happy',
//   SAD = 'Sad',
//   NEUTRAL = 'Neutral',
// }

// interface CheckIn {
//   id: string;
//   mood: Mood;
//   date: string;
// }

// const generateId = () => {
//   return Date.now().toString() + Math.floor(Math.random() * 1000).toString();
// };

// const MoodTracker: React.FC = () => {
//   const [selectedMood, setSelectedMood] = useState<Mood>(Mood.HAPPY);
//   const [checkIns, setCheckIns] = useState<CheckIn[]>([]);

//   const addCheckIn = () => {
//     const newCheckIn: CheckIn = {
//       id: generateId(),
//       mood: selectedMood,
//       date: new Date().toISOString(),
//     };
//     setCheckIns((prev) => [...prev, newCheckIn]);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Select Your Mood:</Text>
//       <Picker
//         selectedValue={selectedMood}
//         onValueChange={(itemValue) => setSelectedMood(itemValue as Mood)}
//         style={styles.picker}
//       >
//         <Picker.Item label="😊 Happy" value={Mood.HAPPY} />
//         <Picker.Item label="😢 Sad" value={Mood.SAD} />
//         <Picker.Item label="😐 Neutral" value={Mood.NEUTRAL} />
//       </Picker>

//       <Button title="Add Check-In" onPress={addCheckIn} />

//       <FlatList<CheckIn>
//         data={checkIns}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <Text style={styles.checkInItem}>
//             {item.date.split('T')[0]} - {item.mood}
//           </Text>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { 
//     flex: 1, 
//     justifyContent: 'center',
//     padding: 20 
// },
//   label: { 
//     fontSize: 18, 
//     marginBottom: 20,
//     textAlign: 'center',
// },
//   picker: { height: 50, width: 200 },
//   checkInItem: { fontSize: 16, paddingVertical: 4 },
// });

// export default MoodTracker;
