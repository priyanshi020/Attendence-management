import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { launchCamera } from 'react-native-image-picker';
import { BLUE, RED } from '../../styles/colors';

export default function RegisterForm() {
  const [userId, setUserId] = useState(generateUserId());
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [rate, setRate] = useState('');
  const [age, setAge] = useState('');
  const [salary, setSalary] = useState('');
  const [imageUri, setImageUri] = useState(null); // State to store the image URI

  // Dummy Avatar
//   const dummyAvatar = require('../Images/maleAvatar.png'); // Path to your local avatar image

  // Function to generate user ID
  function generateUserId() {
    const prefix = 'cv';
    const lastId = 1; // Change this to fetch the last used ID from your database
    return `${prefix}${String(lastId + 1).padStart(4, '0')}`; // Auto-increment logic
  }

  const handleAdd = () => {
    // Logic to handle adding the user
    console.log('User added:', { userId, name, mobile, rate, imageUri });
  };

  const handleCancel = () => {
    // Logic to handle cancel action
    console.log('Registration canceled');
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
      <Navbar />
      {/* User ID */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>USER ID</Text>
        <Text style={styles.userid}>CV0001</Text>
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

      {/* Mobile */}
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
      {/* Mobile */}
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
            <Image  source={require('../../Images/maleAvatar.jpg')}  style={styles.image} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin: 20,
    marginTop:0
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
    color:RED,
    fontSize:20
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
