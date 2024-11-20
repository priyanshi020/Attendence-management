import { Button, Image, StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import React from 'react';
import { height, width, marginLeftAndRight } from '../../styles/mixins';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Logout() {
    const navigation = useNavigation();

    const handleLogout = async () => {
      await AsyncStorage.removeItem('userRole');
      navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    };
  return (
    <View style={styles.container}>
      {/* Centered Logo */}
      <Text>heyy</Text>
      <Image
        style={styles.logo}
        resizeMode="contain"
        source={require("../../Images/tufcon-logo.png")}
      />
      
      {/* Logout Button in the Right Corner */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        {/* <Text style={styles.logoutText}>Logout</Text> */}
        <Image
        style={styles.logoutText}
        resizeMode='contain'
        source={require("../../Images/logoutIcon.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === "android" ? 20 : marginLeftAndRight(0.1),
    position: 'relative',
  },
  logo: {
    width: width(1.9),
    height: height(0.17),
  },
  logoutButton: {
    position: 'absolute',
    right: 310,
    padding: 10,
  },
  logoutText: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
    width: width(0.06),
    height: height(0.05),
  },
});
