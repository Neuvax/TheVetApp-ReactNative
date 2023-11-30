import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from '../firebaseConfig'; // Adjust the path as necessary
import { collection, getDocs } from 'firebase/firestore';

const MenuScreen = ({ navigation }) => {
    const [animals, setAnimals] = useState([]);

    const fetchAnimals = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "animals"));
            const animalsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setAnimals(animalsData);
        } catch (error) {
            console.error("Error fetching animals:", error);
            // Manejar el error adecuadamente
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchAnimals();
        });

        return unsubscribe;
    }, [navigation]);

    const viewDetails = (animal) => {
        navigation.navigate('DetailScreen', { animal, onGoBack: fetchAnimals });
    };

    const registerNewAnimal = () => {
        navigation.navigate('DetailScreen', { animal: null, onGoBack: fetchAnimals });
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={animals}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Text style={styles.itemText}>{item.name}</Text>
                        <TouchableOpacity onPress={() => viewDetails(item)} style={styles.detailButton}>
                            <Text style={styles.buttonText}>Details</Text>
                        </TouchableOpacity>
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
    detailButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
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
