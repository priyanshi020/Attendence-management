import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { height, marginLeftAndRight, width } from '../../styles/mixins';
import { useNavigation, useRoute } from '@react-navigation/native';
import Instance from '../../ServiceModule/Service'; // Ensure you have the correct import for your API instance

export default function Categories() {
    const [categories, setCategories] = useState([]); // State to hold categories
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    const navigation = useNavigation();
    const route = useRoute(); // Get the department ID from the route params
    const { departmentId, departmentName } = route.params; // Assuming the department ID is passed as 'departmentId'
    console.log('------d-------', departmentId + departmentName);

    // Fetch categories based on department ID
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await Instance.get(`category/getAllCategories?departmentId=${departmentId}`);
                setCategories(response.data);
                console.log('response', response.data); // Log the fetched categories
            } catch (error) {
                setError('Failed to load categories');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [departmentId]);

    const handleCreate = () => {
        navigation.navigate('CreateCategory', { departmentId: departmentId, departmentName: departmentName }); // Navigate to CreateCategory
    };

    const handleCategoryPress = (categoryId, categoryName) => {
        // Navigate to EmployeeList screen with category ID and name
        navigation.navigate('EmployeeList', { categoryId:categoryId, categoryName:categoryName,departmentId:departmentId });
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="blue" />
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
                <Text style={styles.text}>{departmentName}</Text>
                <FlatList
                    data={categories}
                    keyExtractor={(item) => item.id} // Ensure keyExtractor converts id to string
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => handleCategoryPress(item._id, item.categoryName)}>
                            <View style={styles.departmentItem}>
                                <Text style={styles.departmentText}>{item.categoryName}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <View style={styles.buttonContainer}>
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
        color: 'purple',
        marginTop: 0,
    },
    listContainer: {
        flex: 1,
        padding: 20,
    },
    departmentItem: {
        backgroundColor: '#FBE3D7',
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
        margin: 20,
    },
    image: {
        width: width(0.1),
        height: height(0.029),
        marginTop: Platform.OS === "android" ? 10 : marginLeftAndRight(0.1),
    },
});
