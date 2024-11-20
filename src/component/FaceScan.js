import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import axios from 'axios';
import * as MediaLibrary from 'expo-media-library';
import Instance from '../ServiceModule/Service';
import { Ionicons } from '@expo/vector-icons';  // Make sure to install this package

const FaceScan = ({ triggerCapture,actionType  }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(false); // Loader state
  const [success, setSuccess] = useState(false); // Success checkmark state
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaLibraryPermissionResponse, requestMediaLibraryPermission] = MediaLibrary.usePermissions();

  useEffect(() => {
    if (cameraPermission?.granted && mediaLibraryPermissionResponse?.status === 'granted') {
      setHasPermission(true);
    } else if (cameraPermission && mediaLibraryPermissionResponse) {
      setHasPermission(false);
    }
  }, [cameraPermission, mediaLibraryPermissionResponse]);

  useEffect(() => {
    if (triggerCapture) {
      captureImage();
    }
  }, [triggerCapture]);

  if (!cameraPermission || !mediaLibraryPermissionResponse) {
    return (
      <View>
        <Text>Loading permissions...</Text>
      </View>
    );
  }

  if (!cameraPermission.granted || mediaLibraryPermissionResponse.status !== 'granted') {
    return (
      <View style={styles.container}>
        <Text>We need camera and gallery permissions to continue.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            requestCameraPermission();
            requestMediaLibraryPermission();
          }}
        >
          <Text style={styles.buttonText}>Grant Permissions</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const captureImage = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync({ base64: true });
      checkFaceRecognition(photo.uri,actionType);
    }
  };

  const checkFaceRecognition = async (uri,action) => {
    if (!uri) return;

    setLoading(true); // Start loader
    setSuccess(false); // Reset success state

    try {
      const formData = new FormData();
      const fileExtension = uri.split('.').pop();
      const fileName = `scannedImage.${fileExtension}`;
  
      const validExtensions = ['jpg', 'jpeg', 'png'];
      if (!validExtensions.includes(fileExtension)) {
        console.error('Invalid file extension:', fileExtension);
        setLoading(false);
        return;
      }
  
      formData.append('scannedImage', {
        uri: uri,
        name: fileName,
        type: `image/${fileExtension}`,
      });
      formData.append('action', action);
  
      const response = await Instance.post('scanning/attendance/mark', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.data.isPresent) {
        setSuccess(true); // Show success checkmark
        Alert.alert('Attendance marked!', 'User is present.');
      } else {
        Alert.alert('Attendance not marked', 'User is not recognized.');
      }

      setAttendanceData(response.data);
    } catch (error) {
      console.error('Error checking attendance:', error);
      Alert.alert('Error', 'There was an error checking attendance.');
    } finally {
      setLoading(false); // Stop loader after API call
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="front" ref={ref => setCameraRef(ref)} />

      {/* Loader and Success Checkmark displayed below the camera */}
      <View style={styles.statusContainer}>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {success && (
          <Ionicons
            name="checkmark-circle"
            size={60}
            color="green"
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 20,
  },
  statusContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
});

export default FaceScan;
