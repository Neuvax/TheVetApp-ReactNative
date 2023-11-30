    import React, { useState, useEffect } from 'react';
    import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
    import { doc, setDoc, addDoc, deleteDoc, collection } from 'firebase/firestore';
    import { db } from '../firebaseConfig';

    const DetailScreen = ({ route, navigation }) => {
        const [name, setName] = useState('');
        const [age, setAge] = useState('');
        const [weight, setWeight] = useState('');
        const isUpdating = route.params?.animal?.id !== undefined;


        useEffect(() => {
            if (route.params?.animal) {
                const { name, age, weight } = route.params.animal;
                setName(name);
                setAge(age);
                setWeight(weight);
            }
        }, [route.params?.animal]);

        const handleRegisterOrUpdate = async () => {
            if (!name || !age || !weight) {
                Alert.alert('Error', 'Por favor, completa todos los campos');
                return;
            }
        
            const animalData = { name, age, weight };
        
            try {
                if (isUpdating) {
                    await setDoc(doc(db, "animals", route.params.animal.id), animalData);
                } else {
                    await addDoc(collection(db, "animals"), animalData);
                }
                Alert.alert('Éxito', `Animal ${isUpdating ? 'actualizado' : 'registrado'} con éxito!`);
        
                // Llamar al callback para recargar los datos en MenuScreen
                route.params?.onGoBack?.();
                navigation.goBack();
            } catch (error) {
                Alert.alert('Error', `Error al guardar: ${error.message}`);
            }
        };

        const handleDelete = async () => {
            if (!isUpdating) {
                Alert.alert("Error", "No se puede eliminar un animal que aún no ha sido registrado.");
                return;
            }
        
            try {
                await deleteDoc(doc(db, "animals", route.params.animal.id));
                Alert.alert("Éxito", "Animal eliminado con éxito.");
                route.params?.onGoBack?.();
                navigation.goBack();
            } catch (error) {
                Alert.alert("Error", `Error al eliminar: ${error.message}`);
            }
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

                <TouchableOpacity style={styles.button} onPress={handleRegisterOrUpdate}>
                    <Text style={styles.buttonText}>{isUpdating ? 'Actualizar' : 'Registrar'}</Text>
                </TouchableOpacity>

                {isUpdating && (
            <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
                <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
        )}
            </View>
        );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: '#fff',
        },
        label: {
            fontSize: 18,
            marginBottom: 6,
            color: '#333',
            fontWeight: 'bold',
        },
        input: {
            height: 50,
            borderWidth: 1,
            marginBottom: 15,
            paddingHorizontal: 10,
            borderColor: '#007bff', 
            borderRadius: 5,
            fontSize: 16, 
            backgroundColor: '#f7f7f7', 
        },
        button: {
            backgroundColor: '#007bff',
            padding: 15,
            borderRadius: 5,
            marginTop: 10,
        },
        buttonText: {
            textAlign: 'center',
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold', 
        },
        deleteButton: {
            backgroundColor: '#ff0000',
            marginTop: 10,
        },
    });


    export default DetailScreen;
