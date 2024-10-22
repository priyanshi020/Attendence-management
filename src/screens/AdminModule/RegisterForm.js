import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Navbar from '../components/Navbar';
import {useNavigation, useRoute} from '@react-navigation/native';
import {BLUE, RED} from '../../styles/colors';
import axios from 'axios';

import Instance from '../../ServiceModule/Service';
import Camera from '../../component/Camera';

export default function RegisterForm() {

  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [rate, setRate] = useState('');
  const [age, setAge] = useState('');
  const [salary, setSalary] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [avatar, setAvatar] = useState(require('../../Images/maleAvatar.jpg'));
  const navigation = useNavigation(); // Hook for navigation
  const route = useRoute();
  const{departmentId,categoryId}=route.params
  console.log('==================props',departmentId + categoryId)
  useEffect(() => {
    // Fetch total users count on component mount to set user ID
    fetchUserCount();
  }, []);
  useEffect(() => {
    if (route.params?.capturedImage) {
      setAvatar({ uri: route.params.capturedImage });
    }
  }, [route.params?.capturedImage]);

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
    const roleId=3;
    const password='tufcon'
    console.log('==musky================props',departmentId + categoryId)

  // Prepare user data
  const userData = new FormData();
  userData.append('departmentId',departmentId)
  userData.append('categoryId',categoryId)
  userData.append('userId', userId);
  userData.append('name', name);
  userData.append('mobile', mobile);
  userData.append('rate', rate);
  userData.append('age', age);
  userData.append('salary', salary);
  userData.append('roleId',roleId)
  userData.append('password',password)
  
  // Use the avatar state for image data
  console.log('image',avatar?.uri)
  // if (avatar?.uri) {
  //   userData.append('userImg', {
  //     uri: avatar.uri,
  //     type: 'image/jpeg', // Adjust the type according to the image format
  //     name: 'userImage.jpg', // Provide a name for the file
  //   });
  // }

  console.log('----------------->userdata', userData);
  
  try {
    await Instance.post('users/createUser', userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('User added:', userData);
    navigation.navigate('EmployeeList',{departmentId:departmentId,categoryId:categoryId});
  } catch (error) {
    console.error('Error adding user:', error);
  }
};


  const handleCancel = () => {
    console.log('Registration canceled');
    navigation.goBack(); 
  };
  
  const onImagePress =() =>{
    navigation.navigate('OpenCamera',{departmentId:departmentId,categoryId:categoryId})
  }
  const isCapturedImage = avatar.uri ? true : false;
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
          <TouchableOpacity style={styles.uploadButton}
          onPress={onImagePress} >
                 <Image
                source={avatar}
                style={isCapturedImage ? styles.capturedImage : styles.avatar}
              />

             
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
    marginTop: 0,
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
    fontSize: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  uploadButton: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'end',
    alignItems: 'end',
    backgroundColor: '#fff',
  },
  capturedImage : {
    width: 130,
    height: 130,
    // borderRadius: 75, 
  },
  avatar:{
    width: 120,
    height: 120,
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

