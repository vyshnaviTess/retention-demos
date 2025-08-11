import { useQuery } from '@apollo/client';
import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { GET_COUNTRIES } from '../graphql/queries';




interface Country {
code: string;
name: string;
emoji: string;
}

interface CountryData {
 countries: Country[];
}

export default function CountryList() {

    const { data, loading, error } = useQuery<CountryData>(GET_COUNTRIES);

    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (error) return <Text style={styles.error}>Error: {error.message}</Text>
    return (
<View style={{ flex: 1, paddingTop: 20 }}>
    <Text style={styles.heading}>Countries</Text>
        <FlatList 
        data={data?.countries} 
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
            <View style={styles.item}>
                <Text style={styles.text}>
                    {item.emoji} {item.name}
                </Text>
            </View>
        )}
        
    />
      </View>
    );
}

const styles = StyleSheet.create({
    loader :{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
     error: { 
    color: 'red', 
    padding: 20, 
    fontWeight: "bold" 
  },
    item: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    text: {
        fontSize: 16,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },

})