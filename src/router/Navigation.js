import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
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

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown:false}}>
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
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({})