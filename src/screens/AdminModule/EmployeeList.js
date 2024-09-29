import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import React from 'react';
import Navbar from '../components/Navbar';
import { height, marginLeftAndRight, width } from '../../styles/mixins';
import { useNavigation } from '@react-navigation/native';
import { RED } from '../../styles/colors';

// Sample user data
const userList = [
    { id: '1', username: 'JohnDoe' },
    { id: '2', username: 'JaneSmith' },
    { id: '3', username: 'MikeJohnson' },
    { id: '4', username: 'EmilyDavis' },
    { id: '5', username: 'ChrisEvans' },
];

export default function EmployeeList() {
    const navigation = useNavigation()
    const handleCreate = () =>{
        navigation.navigate('RegisterScreen')
    }
    const handleDelete = (id) => {
        // Logic to handle deletion of the user
        console.log(`Delete user with id: ${id}`);
    };

    const renderItem = ({ item }) => (
        <View style={styles.userItem}>
            <Text style={styles.username}>{item.username}</Text>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Image
                    style={styles.image}
                    resizeMode='contain'
                    source={require('../../Images/deleteicon.png')}
                />
            </TouchableOpacity>
        </View>
    );

    return (
        <View >
            <Navbar />
            <View style={styles.container1}>
                {/* Create Button */}
                <TouchableOpacity style={styles.createButton}>
                    <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity>

                {/* User List */}
                <FlatList
                    data={userList}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    style={styles.list}
                />
            </View>
            <View style={styles.buttonContainer}>

                <View></View>

                <TouchableOpacity onPress={handleCreate} style={styles.loginButton}>
                   <Text style={styles.loginButtonText}>Add User</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        margin: 20
    },
    container1: {
        margin: 40,
        marginTop: 0
    },
    createButton: {
        backgroundColor: RED,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    list: {
        marginTop: 10,
    },
    userItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,

    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
        color: RED
    },
    image: {
        width: width(0.1),
        height: height(0.029),
        marginTop: Platform.OS === "android" ? 10 : marginLeftAndRight(0.1),

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        margin: 20
    },
    loginButton: {
        width: width(0.24),
        height: 50,
        backgroundColor: RED, // Red background for login button
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 100,
        marginBottom:150,
        borderWidth: 3, // Black border
        borderColor: 'black',
        
      },
      loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      },
});
