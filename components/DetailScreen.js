import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const DetailScreen = ({ route, navigation }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');

    // Check if an animal is passed to the screen
    useEffect(() => {
        if (route.params?.animal) {
            setName(route.params.animal.name);
            // Set age and weight similarly if available
        }
    }, [route.params?.animal]);

    const handleRegisterOrUpdate = () => {
        if (!name || !age || !weight) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        const animalData = { name, age, weight };

        // Save to Firebase
        // If it's a new animal, add it to the database
        // If it's an existing animal, update its details

        // Navigate back to the MenuScreen or show success message
        Alert.alert('Success', 'Animal details saved!');
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter animal name"
            />

            <Text style={styles.label}>Age:</Text>
            <TextInput
                style={styles.input}
                value={age}
                onChangeText={setAge}
                placeholder="Enter animal age"
                keyboardType="numeric"
            />

            <Text style={styles.label}>Weight:</Text>
            <TextInput
                style={styles.input}
                value={weight}
                onChangeText={setWeight}
                placeholder="Enter animal weight"
                keyboardType="numeric"
            />

            <Button title="Register/Update" onPress={handleRegisterOrUpdate} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 6,
    },
    input: {
        height: 40,
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
    },
});

export default DetailScreen;
