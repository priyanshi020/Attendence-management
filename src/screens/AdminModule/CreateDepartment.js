import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Navbar from '../components/Navbar';
import { height, marginLeftAndRight, width } from '../../styles/mixins';
import { useNavigation } from '@react-navigation/native';
import { PURPLE, RED, SKIN } from '../../styles/colors';

export default function CreateDepartment() {
    const navigation = useNavigation()
    const handleCreate = () => {
        navigation.navigate('Categories'); // Navigate to Department screen
    };
    return (
        <View style={styles.container}>
            <Navbar />

            {/* Input Field Section */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}> Name</Text>
                <TextInput
                    style={styles.input}

                />
            </View>

            {/* Create Button */}
            <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
                <Text style={styles.buttonText}>CREATE</Text>
            </TouchableOpacity>

            {/* Plus Icon */}
            <TouchableOpacity style={styles.plusButton}>
                <Image
                    style={styles.image}
                    resizeMode='contain'
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
        fontWeight: 'bold'

    },
    createButton: {
        position:'absolute',
        bottom: -55,
        right: 160,
        width: width(0.24),
        height: 50,
        backgroundColor: RED, // Red background for login button
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
        marginTop: Platform.OS === "android" ? 10 : marginLeftAndRight(0.1),

    }
});
