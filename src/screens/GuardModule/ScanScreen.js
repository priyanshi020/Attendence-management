import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { BLUE } from '../../styles/colors';
import FaceScan from '../../component/FaceScan';
import Logout from '../components/Logout';

const ScanScreen = () => {
  const [isCaptureTriggered, setIsCaptureTriggered] = useState(false);
  const [actionType, setActionType] = useState(''); 
  const handleScan = (action) => {
    setActionType(action); // Set action type based on button clicked
    setIsCaptureTriggered(true);
    setTimeout(() => setIsCaptureTriggered(false), 1000); // Reset after triggering
  };


  return (
    <View style={styles.container}>
      {/* <Navbar /> */}
      <Logout/>
      <Text style={styles.heading}>SCAN ANY FACE</Text>

      {/* Scan camera */}
      <FaceScan triggerCapture={isCaptureTriggered} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}onPress={() => handleScan('in')}>
          <Text style={styles.buttonText}>In/Out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={() => handleScan('rescan')}>Remark</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin: 20,
  },
  heading: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: BLUE,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  button: {
    flex: 1,
    backgroundColor: BLUE,
    padding: 8,
    marginHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ScanScreen;
