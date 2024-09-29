import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Navbar from '../components/Navbar';
import { height, marginLeftAndRight, width } from '../../styles/mixins';
import { useNavigation } from '@react-navigation/native';
import { BLUE, PURPLE, RED, SKIN } from '../../styles/colors';
// Sample JSON data for departments
const departments = [
    { id: '1', name: 'CIVIL' },
    { id: '2', name: 'MILL' },
    { id: '3', name: 'LABOUR' },
    { id: '4', name: 'KITCHEN' },
    { id: '5', name: 'PRINTING HOUSE' },
];

export default function Department() {
    const navigation = useNavigation()
    const handleCreate = () => {
        navigation.navigate('CreateDepartment'); // Navigate to Department screen
    };
    const handleReport = () =>{
        navigation.navigate('ViewReport')
    }
    return (
        <View style={styles.container}>
            <Navbar />
            <View style={styles.listContainer}>
                <Text style={styles.text}>DEPARTMENT</Text>
                <FlatList
                    data={departments}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.departmentItem}>
                            <Text style={styles.departmentText}>{item.name}</Text>
                        </View>
                    )}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.leftReportButton} onPress={handleReport}>
                    <Text style={styles.buttonText}> Report</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.addButton}>
          <Icon name="plus" size={20} color="white" />
        </TouchableOpacity> */}
                <TouchableOpacity onPress={handleCreate}>
                    <Image
                        style={styles.image}
                        resizeMode='contain'
                        source={require('../../Images/add.png')}
                    />
                </TouchableOpacity>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 20,
        color: PURPLE,
        marginTop: 0
    },
    listContainer: {
        flex: 1,
        padding: 20,
    },
    departmentItem: {
        backgroundColor:SKIN,
        padding: 15,
        borderRadius: 10,
        margin: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3, // For Android shadow
    },
    departmentText: {
        fontSize: 18,
        // fontWeight: 'bold',
        color: 'black'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        margin: 20
    },

    leftReportButton: {
        backgroundColor:BLUE,
        flex: 0.25, // Makes the button occupy 45% of the width
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
    },
    addButton: {
        backgroundColor: RED,
        flex: 0.45, // Makes the button occupy 45% of the width
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        width: width(0.1),
        height: height(0.029),
        marginTop: Platform.OS === "android" ? 10 : marginLeftAndRight(0.1),

    }
});
