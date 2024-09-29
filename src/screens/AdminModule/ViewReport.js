import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { BLUE, RED } from '../../styles/colors'
import Department from './Department'
import { useNavigation } from '@react-navigation/native'
import { width } from '../../styles/mixins'

export default function ViewReport() {
    const [department,setDepartment]=useState('');
    const [category,setCategory]=useState('');
    const navigation=useNavigation()
    const handleGo=()=>{
        navigation.navigate('Report')
    }
  return (
    <View style={styles.container}>
      <Navbar/>
      <Text style={styles.heading}>REPORT</Text>
       {/* Name */}
       <View style={styles.inputContainer}>
        <Text style={styles.label}>Department</Text>
        <TextInput
          style={styles.input}
          value={department}
          onChangeText={setDepartment}
          placeholder=""
        />
      </View>

      {/* Mobile */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Category</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
          placeholder=""
          keyboardType="phone-pad"
        />
      </View>

       {/* Login Button */}
       <TouchableOpacity style={styles.createButton} onPress={handleGo}>
                <Text style={styles.buttonText}>Go</Text>
            </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        margin: 20,
      },
    heading:{
        textAlign:'center',
        fontSize:25,
        fontWeight:'bold',
        color:BLUE,
        marginBottom:20
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
      createButton: {
        position:'absolute',
        bottom: 205,
        right: 120,
        width: width(0.39),
        height: 45,
        backgroundColor: '#FCE5D1', // Red background for login button
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        marginBottom: 150,
        borderWidth: 3, // Black border
        borderColor: '#896471',

    },
    buttonText: {
        color: RED,
        fontSize: 25,
        fontWeight: 'bold',

    },
})