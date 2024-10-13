import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { launchCamera } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { BLUE, RED } from '../../styles/colors';
import axios from 'axios';
import Instance from '../../ServiceModule/Service'
export default function RegisterForm() {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [rate, setRate] = useState('');
  const [age, setAge] = useState('');
  const [salary, setSalary] = useState('');
  const [imageUri, setImageUri] = useState(null); // State to store the image URI

  const navigation = useNavigation(); // Hook for navigation

  useEffect(() => {
    // Fetch total users count on component mount to set user ID
    fetchUserCount();
  }, []);

  // Fetch total users count from the API
  const fetchUserCount = async () => {
    try {
      const response = await Instance.get('users/getAllUsers'); // Replace with actual API
      const users = response.data; // Assuming the API returns an array of users
      const userCount = users.length; // Count the number of users in the array
      setUserId(`CV${String(userCount + 1).padStart(4, '0')}`); // Set user ID by incrementing count
    } catch (error) {
      console.error('Error fetching user count:', error);
    }
  };


  const handleAdd = async () => {
    // Prepare user data
    const userData = { userId: userId, name: name, mobile: mobile, rate: rate, age: age, salary: salary, userImg: imageUri };
    console.log('----------------->userdata', userData)
    try {
      // Call the API to register the user
      await Instance.post('users/createUser', userData); // Replace with actual API

      console.log('User added:', userData);

      // Navigate back to the employee list
      navigation.navigate('EmployeeList'); // Ensure 'EmployeeList' route is defined
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleCancel = () => {
    console.log('Registration canceled');
    navigation.goBack(); // Navigate back to the previous screen
  };

  const handleImageCapture = () => {
    const options = {
      mediaType: 'photo',
      cameraType: 'back',
    };

    launchCamera(options, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri); // Set the captured image URI
      }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Navbar />
        {/* User ID */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>USER ID</Text>
          <Text style={styles.userid}>{userId}</Text>
        </View>

        {/* Name */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>NAME</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder=""
          />
        </View>

        {/* Mobile */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>MOBILE</Text>
          <TextInput
            style={styles.input}
            value={mobile}
            onChangeText={setMobile}
            placeholder=""
            keyboardType="phone-pad"
          />
        </View>

        {/* Age */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>AGE</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            placeholder=""
            keyboardType="phone-pad"
          />
        </View>

        {/* Salary */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>SALARY</Text>
          <TextInput
            style={styles.input}
            value={salary}
            onChangeText={setSalary}
            placeholder=""
            keyboardType="phone-pad"
          />
        </View>

        {/* Rate */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>RATE</Text>
          <TextInput
            style={styles.input}
            value={rate}
            onChangeText={setRate}
            placeholder=""
            keyboardType="numeric"
          />
        </View>

        {/* Image Capture */}
        <View style={styles.imageContainer}>
          <Text style={styles.label}></Text>
          <TouchableOpacity style={styles.uploadButton} onPress={handleImageCapture}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
              <Image source={require('../../Images/maleAvatar.jpg')} style={styles.image} />
            )}
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.buttonText}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
            <Text style={styles.buttonText}>ADD</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin: 20,
    marginTop: 0
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  label: {
    width: 150,
    fontSize: 18,
    color: BLUE,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    color: RED,
    fontSize: 20
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  uploadButton: {
    width: 210,
    height: 210,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'end',
    alignItems: 'end',
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 75, // Circle image
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#FCE5D1',
    padding: 8,
    borderWidth: 2,
    flex: 1,
    marginRight: 15,
    alignItems: 'center',
    borderColor: '#896471',
  },
  addButton: {
    backgroundColor: '#FCE5D1',
    padding: 8,
    borderWidth: 2,
    flex: 1,
    alignItems: 'center',
    borderColor: '#896471',
  },
  buttonText: {
    color: RED,
    fontWeight: 'bold',
    fontSize: 23,
  },
  userid: {
    color: RED,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
