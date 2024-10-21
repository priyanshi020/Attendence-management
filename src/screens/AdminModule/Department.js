import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { height, marginLeftAndRight, width } from '../../styles/mixins';
import { useNavigation } from '@react-navigation/native';
import { BLUE, PURPLE, RED, SKIN } from '../../styles/colors';
import Instance from '../../ServiceModule/Service'
import { useFocusEffect } from '@react-navigation/native';
export default function Department() {
    const [departments, setDepartments] = useState([]); // State for storing departments
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const navigation = useNavigation();

    // Fetch departments from API
    // useEffect(() => {
    //     const fetchDepartments = async () => {
    //         try {
    //             const response = await Instance.get('department/getDepartments'); // Update with your API endpoint
    //             setDepartments(response.data);
    //             console.log('---------------',departments)
    //         } catch (err) {
    //             setError('Failed to load departments');
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //     fetchDepartments();
    // }, []);
    useFocusEffect(
        React.useCallback(() => {
            // Function to fetch all departments
            const fetchDepartments = async () => {
                try {
                    setLoading(true);
                    const response = await Instance.get('department/getDepartments');
                    setDepartments(response.data);
                } catch (error) {
                    Alert.alert('Error', 'Failed to fetch departments');
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };

            fetchDepartments(); // Call the function when screen is focused

            return () => {
                // Cleanup if needed
            };
        }, [])
    );

    const handleCreate = () => {
        navigation.navigate('CreateDepartment'); // Navigate to Create Department screen
    };

    const handleReport = () => {
        navigation.navigate('ViewReport'); // Navigate to View Report screen
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={BLUE} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={{ color: 'red', fontSize: 18 }}>{error}</Text>
            </View>
        );
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
                        <TouchableOpacity
                            style={styles.departmentItem}
                            
                            onPress={() => navigation.navigate('Categories', { departmentId: item._id,departmentName:item.departmentName })} // Pass departmentId here
                        >
                            <Text style={styles.departmentText}>{item.departmentName}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.leftReportButton} onPress={handleReport}>
                    <Text style={styles.buttonText}> Report</Text>
                </TouchableOpacity>

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
        backgroundColor: SKIN,
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
        color: 'black',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        margin: 20
    },
    leftReportButton: {
        backgroundColor: BLUE,
        flex: 0.25,
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
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
