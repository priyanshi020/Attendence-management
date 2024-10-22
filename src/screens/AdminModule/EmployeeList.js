import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Navbar from '../components/Navbar';
import {height, marginLeftAndRight, width} from '../../styles/mixins';
import {useNavigation, useRoute} from '@react-navigation/native';
import Instance from '../../ServiceModule/Service'; // Ensure the correct import for your API instance
import {RED} from '../../styles/colors';

export default function EmployeeList() {
  const navigation = useNavigation();
  const route = useRoute();
  const {departmentId, categoryId, categoryName} = route.params; // Extract departmentId and categoryId from route params
console.log('-------------------departmenddddd',departmentId + categoryId )
  const [userList, setUserList] = useState([]); // State to hold user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch user data based on departmentId and categoryId
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Instance.get(
          `users/getAllUsers?departmentId=${departmentId}&categoryId=${categoryId}`,
        );
        setUserList(response.data); // Set the user data
        console.log('Fetched Users:', response.data); // Log the fetched users
      } catch (error) {
        setError('Failed to load users'); // Set error message
        console.error(error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUsers();
  }, [departmentId, categoryId]); // Dependency array

  const handleCreate = () => {
    navigation.navigate('RegisterScreen', {
      categoryId: categoryId,
      departmentId: departmentId,
    }); // Navigate to the registration screen
  };

  const handleDelete = async id => {
    console.log('id kys h vro', id);
    try {
      const response = await Instance.post(`users/deleteUser/${id}`);
      console.log('delete user ki id or respone', response.status + id);
      if (response.status === 200) {
        console.log(`User deleted successfully: ${id}`);
        // Optionally, update UI after successful deletion
      } else {
        console.error('Failed to delete user', response.statusText);
      }
    } catch (error) {
      console.error('Error occurred while deleting user:', error);
    }
  };

  const renderItem = ({item}) => (
    <View style={styles.userItem}>
      <Text style={styles.username}>{item.name}</Text>
      <TouchableOpacity onPress={() => handleDelete(item._id)}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={require('../../Images/deleteicon.png')}
        />
      </TouchableOpacity>
    </View>
  );

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
        <Text style={{color: 'red', fontSize: 18}}>{error}</Text>
      </View>
    );
  }

  return (
    <View>
      <Navbar />
      <View style={styles.container1}>
        {/* Create Button */}
        <TouchableOpacity style={styles.createButton} >
          <Text style={styles.buttonText}>{categoryName}</Text>
        </TouchableOpacity>

        {/* User List */}
        <FlatList
          data={userList}
          renderItem={renderItem}
          keyExtractor={item => item.id} // Ensure keyExtractor converts id to string
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
    margin: 20,
  },
  container1: {
    margin: 40,
    marginTop: 0,
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
    color: RED,
  },
  image: {
    width: width(0.1),
    height: height(0.029),
    marginTop: Platform.OS === 'android' ? 10 : marginLeftAndRight(0.1),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    margin: 20,
  },
  loginButton: {
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
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
