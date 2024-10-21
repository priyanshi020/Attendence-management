import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Navbar from './components/Navbar';
import { PINK, RED } from '../styles/colors';
import { height, marginLeftAndRight, width } from '../styles/mixins';
import Instance from '../ServiceModule/Service'

export default function Home() {
  const navigation = useNavigation();

  // State for User ID and Password
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    navigation.navigate('RegisterScreen')


    // console.log('this is usrID : ', userId, password)
    // if (!userId || !password) {
    //   Alert.alert('Error', 'Please enter both User ID and Password');
    //   setLoading(false);
    //   return;
    // }

    // try {
    //   console.log('helo')
    //   const response = await Instance.post('users/login', {
    //     email: userId,
    //     password: password,
    //   })

    //   if (response.status === 200) {
    //     if (response.data.user.roleId === 1) {
    //       navigation.navigate('Department');
    //     } else if (response.data.user.roleId === 2) {
    //       navigation.navigate('ViewScreen')
    //     }
    //   } else {
    //     Alert.alert('Login Failed', response.data.message || 'Invalid User ID or Password');
    //   }
    // } catch (error) {
    //   if (error.response) {
    //     Alert.alert('Login Failed', error.response.data.message || 'Invalid User ID or Password');
    //   } else {
    //     Alert.alert('Error', 'Something went wrong. Please try again later.');
    //   }
    // } finally {
    //   setLoading(false); 
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <Navbar />

        {/* Profile Image inside a Circle */}
        <View style={styles.profileImageContainer}>
          <Image
            style={styles.profileImage}
            resizeMode="cover"
            source={require('../Images/maleAvatar.jpg')}
          />
        </View>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="USER ID"
        placeholderTextColor="black"
        textAlign="center"
        value={userId} 
        onChangeText={txt => setUserId(txt)}
      />
      <TextInput
        style={styles.input}
        placeholder="PASSWORD"
        placeholderTextColor="black"
        secureTextEntry
        textAlign="center"
        value={password} 
        onChangeText={txt => setPassword(txt)}
      />

      {/* Login Button */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.loginButtonText}>
          {loading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageContainer: {
    width: width(0.5),
    height: width(0.5),
    borderRadius: width(0.25),
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  input: {
    width: width(0.7),
    height: 50,
    backgroundColor: PINK,
    paddingHorizontal: 15,
    marginTop: 30,
    borderWidth: 3, 
    borderColor: 'black',
    color: 'black',
  },
  loginButton: {
    width: width(0.24),
    height: 50,
    backgroundColor: RED, 
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
