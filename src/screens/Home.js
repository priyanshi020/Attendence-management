import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import {height, marginLeftAndRight, width} from '../styles/mixins';
import Navbar from './components/Navbar';
import {useNavigation} from '@react-navigation/native';
import {PINK, RED} from '../styles/colors';

export default function Home() {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('Department');
    console.log('objecnnnnnnnnsst');
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
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
        />
        <TextInput
          style={styles.input}
          placeholder="PASSWORD"
          placeholderTextColor="black"
          secureTextEntry
          textAlign="center"
        />

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
    borderWidth: 3, // Black border
    borderColor: 'black',
    color: 'black',
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
