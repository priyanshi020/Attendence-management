import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { height, marginLeftAndRight, width } from '../../styles/mixins';
import { useNavigation } from '@react-navigation/native';
import { PURPLE, RED, SKIN } from '../../styles/colors';
import axios from 'axios';
import Instance from '../../ServiceModule/Service'
import Logout from '../components/Logout';
export default function CreateDepartment() {
    const [departmentName, setDepartmentName] = useState(''); // State for department name
    const [loading, setLoading] = useState(false); // Loading state
    const navigation = useNavigation();

    const handleCreate = async () => {
        if (!departmentName.trim()) {
            Alert.alert('Error', 'Please enter a department name');
            return;
        }

        setLoading(true);
        try {
            // Send POST request to create department
            const response = await Instance.post('department/createDepartment', {
                departmentName: departmentName,
            });

            // Handle success
            Alert.alert('Success', 'Department created successfully');
            navigation.navigate('Department'); // Navigate to Categories screen after success
        } catch (error) {
            // Handle error
            Alert.alert('Error', 'Failed to create department');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Logout/>
            {/* <Navbar /> */}

            {/* Input Field Section */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}> Name</Text>
                <TextInput
                    style={styles.input}
                    value={departmentName}
                    onChangeText={setDepartmentName} // Update department name on input change
                    placeholder="Enter department name"
                />
            </View>

            {/* Create Button */}
            <TouchableOpacity style={styles.createButton} onPress={handleCreate} disabled={loading}>
                <Text style={styles.buttonText}>
                    {loading ? 'CREATING...' : 'CREATE'}
                </Text>
            </TouchableOpacity>

            {/* Plus Icon */}
            <TouchableOpacity style={styles.plusButton}>
                <Image
                    style={styles.image}
                    resizeMode="contain"
                    source={require('../../Images/add.png')}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20,
    },
    label: {
        color: PURPLE,
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
        flex: 1, // Takes up 1 part of the available space
    },
    input: {
        flex: 2, // Takes up 2 parts of the available space
        height: 40,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: SKIN,
        fontWeight: 'bold',
    },
    createButton: {
        position: 'absolute',
        bottom: -55,
        right: 160,
        width: width(0.24),
        height: 50,
        backgroundColor: RED, // Red background for create button
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 100,
        marginBottom: 150,
        borderWidth: 3, // Black border
        borderColor: 'black',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    plusButton: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: width(0.1),
        height: height(0.029),
        marginTop: Platform.OS === 'android' ? 10 : marginLeftAndRight(0.1),
    },
});
