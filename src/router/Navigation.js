import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Department from '../screens/AdminModule/Department';
import CreateDepartment from '../screens/AdminModule/CreateDepartment';
import Categories from '../screens/AdminModule/Categories';
import EmployeeList from '../screens/AdminModule/EmployeeList';
import RegisterForm from '../screens/AdminModule/RegisterForm';
import ViewReport from '../screens/AdminModule/ViewReport';
import Report from '../screens/AdminModule/Report';
import ViewScreen from '../screens/GuardModule/ViewScreen';
import CreateCategory from '../screens/AdminModule/CreateCategories';
import Camera from '../component/Camera';
import ScanScreen from '../screens/GuardModule/ScanScreen';
// import ScanCamera from '../component/ScanCamera';
import FaceDetect from '../component/FaceDetect';
import FaceScan from '../component/FaceScan';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const [initialRoute, setInitialRoute] = useState('Home');

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const role = await AsyncStorage.getItem('userRole');
        if (role === '1') {
          setInitialRoute('Department');
        } else if (role === '2') {
          setInitialRoute('ViewScreen');
        }
      } catch (error) {
        console.error('Failed to load role from storage');
      }
    };
    checkLoginStatus();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Department" component={Department}/>
        <Stack.Screen name='CreateDepartment' component={CreateDepartment}/>
        <Stack.Screen name='Categories' component={Categories}/>
        <Stack.Screen name='CreateCategory' component={CreateCategory}/>
        <Stack.Screen name='EmployeeList' component={EmployeeList}/>
        <Stack.Screen name='RegisterScreen' component={RegisterForm}/>
        <Stack.Screen name='ViewReport' component={ViewReport}/>
        <Stack.Screen name='Report' component={Report}/>
        <Stack.Screen name='ViewScreen' component={ViewScreen}/>
        <Stack.Screen name='OpenCamera' component={Camera}/>
        <Stack.Screen name='ScanScreen' component={ScanScreen}/>
        {/* <Stack.Screen name='FaceDEtect' component={ScanCamera}/> */}
        <Stack.Screen name='FaceDetect' component={FaceScan}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})