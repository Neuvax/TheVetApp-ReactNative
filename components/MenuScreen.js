import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const MenuScreen = ({ navigation }) => {
    // Sample data - replace this with Firebase data fetching logic
    const animals = [
        { id: '1', name: 'Charlie' },
        { id: '2', name: 'Max' },
        // Add more sample animals
    ];

    // Function to navigate to DetailScreen with animal's data
    const viewDetails = (animal) => {
        navigation.navigate('DetailScreen', { animal });
    };

    // Function to navigate to DetailScreen for registering a new animal
    const registerNewAnimal = () => {
        navigation.navigate('DetailScreen', { animal: null });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={animals}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Text style={styles.itemText}>{item.name}</Text>
                        <Button title="Details" onPress={() => viewDetails(item)} />
                    </View>
                )}
            />
            <TouchableOpacity style={styles.addButton} onPress={registerNewAnimal}>
                <Text style={styles.addButtonText}>Register New Animal</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    listItem: {
        padding: 10,
        fontSize: 18,
        height: 44,
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    itemText: {
        fontSize: 18
    },
    addButton: {
        backgroundColor: '#007bff',
        padding: 10,
        margin: 15,
        borderRadius: 5,
    },
    addButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
    },
});

export default MenuScreen;
