import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { BLUE, RED } from '../../styles/colors'
import Department from './Department'
import { useNavigation } from '@react-navigation/native'
import { width } from '../../styles/mixins'
import Instance from '../../ServiceModule/Service'
export default function ViewReport() {
    const [department,setDepartment]=useState('');
    const [category,setCategory]=useState('');
    const [departmentId, setDepartmentId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [isLoading, setLoading] = useState(false);
    const navigation=useNavigation()
    const fetchIds = async () => {
      try {
        // Fetch Department ID
        // const departmentResponse = await fetch(
        //   `http://localhost:8888/department/getDepartmentByName?name=${department}`
        // );
        const departmentResponse=await Instance.get(`department/getDepartmentByName?departmentName=${department}`)
        const departmentData = departmentResponse.data
        setDepartmentId(departmentData._id); // Set the department ID
  
        // Fetch Category ID
        // const categoryResponse = await fetch(
        //   `http://localhost:8888/getCategoryId?name=${category}`
        // );
        const categoryResponse=await Instance.get(`category/getCategorybyname?categoryName=${category}`)
        const categoryData = categoryResponse.data
        setCategoryId(categoryData._id); // Set the category ID
  console.log('vategefefedata',categoryData._id)
        // If both IDs are successfully fetched, call the getAllUsers API
        if (departmentData._id && categoryData._id) {
          fetchUsers(departmentData._id, categoryData._id);
        }
      } catch (error) {
        console.error('Error fetching department/category IDs:', error);
      }
    };
  
    // Function to call the getAllUsers API with departmentId and categoryId
    const fetchUsers = async (deptId, catId) => {
      setLoading(true);
      console.log('depidand carid',deptId + catId)
      try {
        // const response = await fetch(
        //   `http://localhost:8888/users/getAllUsers?departmentId=${deptId}&categoryId=${catId}`
        // );
        const response = await Instance.get(`users/getAllUsers?departmentId=${deptId}&categoryId=${catId}`)
        const data = response.data;
        console.log('Fetched Users:', data);
        navigation.navigate('Report',{data:data}); // Navigate to "Report" on success
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false); // Stop loading when the API call completes
      }
    };
  
    const handleGo = async () => {
      if (department && category) {
        await fetchIds(); // Fetch department and category IDs first
      }
    };
  
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

        />
      </View>

       {/* Login Button */}
       <TouchableOpacity
        style={[
          styles.createButton,
          !(department && category) && styles.disabledButton, // Add a disabled style when fields are empty
        ]}
        onPress={handleGo}
        disabled={!(department && category)} // Disable button until both fields are filled
      >
        <Text style={styles.buttonText}>Go</Text>
      </TouchableOpacity>

      {isLoading && <Text>Loading...</Text>}
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
        // position:'absolute',
        // bottom: 205,
        // right: 120,
        display:'flex',
        width: width(0.39),
        height: 45,
        backgroundColor: '#FCE5D1', // Red background for login button
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 250,
        marginLeft:70,
        borderWidth: 3, // Black border
        borderColor: '#896471',

    },
    buttonText: {
        color: RED,
        fontSize: 25,
        fontWeight: 'bold',

    },
    disabledButton: {
      backgroundColor: '#ccc', // Disable button color
    },
})