import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BLUE, RED } from '../../styles/colors';
import Instance from '../../ServiceModule/Service';
import { IMAGE_PATH } from '../../ServiceModule/Image';

export default function RegisterForm() {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [rate, setRate] = useState('');
  const [age, setAge] = useState('');
  const [salary, setSalary] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [avatar, setAvatar] = useState(require('../../Images/maleAvatar.jpg'));
  const navigation = useNavigation();
  const route = useRoute();
  const { departmentId, categoryId, categroyName } = route.params;

  useEffect(() => {
    fetchUserCount();
  }, []);

  useEffect(() => {
    if (route.params?.capturedImage) {
      setImageUri(route.params.capturedImage); // Capture image URI
      setAvatar({ uri: route.params.capturedImage }); // Set avatar image
    }
  }, [route.params?.capturedImage]);

  const fetchUserCount = async () => {
    try {
      const response = await Instance.get('users/getAllUsers');
      const users = response.data;
      const userCount = users.length;
      setUserId(`CV${String(userCount + 1).padStart(4, '0')}`);
    } catch (error) {
      console.error('Error fetching user count:', error);
    }
  };

  const validatePhoneNumber = (number) => {
    const phoneNumberRegex = /^[0-9]{10}$/;
    setIsValid(phoneNumberRegex.test(number));
  };

  const handleMobileChange = (text) => {
    setMobile(text);
    validatePhoneNumber(text);
  };

  const handleAdd = async () => {
    const userData = new FormData();
    userData.append('departmentId', departmentId);
    userData.append('categoryId', categoryId);
    userData.append('userId', userId);
    userData.append('name', name);
    userData.append('mobile', mobile);
    userData.append('rate', rate);
    userData.append('age', age);
    userData.append('salary', salary);
    userData.append('roleId', 3);
    userData.append('password', 'password');
  
    if (imageUri) {
      const fileExtension = imageUri.split('.').pop();
      const fileName = `${userId}.${fileExtension}`;
  
      // Validate the file extension
      const validExtensions = ['jpg', 'jpeg', 'png', 'gif'];
      if (!validExtensions.includes(fileExtension)) {
        console.error('Invalid file extension:', fileExtension);
        return; // or handle the error accordingly
      }
  
      const imageFile = {
        uri: imageUri,
        name: fileName,
        type: `image/${fileExtension}`,
      };
  
      userData.append('userImg', imageFile);
      console.log('imageuri', imageUri);
    }
  
    // Log FormData contents
    for (let i = 0; i < userData._parts.length; i++) {
      const [key, value] = userData._parts[i];
      console.log(`${key}:`, value);
    }
  
    try {
      const response = await Instance.post('users/createUser', userData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('User added:', response.data);
      navigation.navigate('EmployeeList', { departmentId, categoryId, categroyName });
    } catch (error) {
      if (error.response) {
        console.error('Error adding user:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error:', error.message);
      }
    }
  };
  
  

  const handleCancel = () => {
    navigation.goBack();
  };

  const onImagePress = () => {
    navigation.navigate('OpenCamera', { departmentId, categoryId, categroyName });
  };

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
            style={[styles.input, !isValid && styles.invalidInput]}
            value={mobile}
            onChangeText={handleMobileChange}
            keyboardType="phone-pad"
            maxLength={10}
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
            keyboardType="numeric"
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
          <TouchableOpacity style={styles.uploadButton} onPress={onImagePress}>
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
  capturedImage: {
    width: 130,
    height: 130,
  },
  avatar: {
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
  invalidInput: {
    borderColor: 'red',
  },
});
