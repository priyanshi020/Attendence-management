import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Alert, TouchableOpacity } from 'react-native';
import { Camera, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as FaceDetector from 'expo-face-detector';
import Button from './Button'; // Check this path and ensure it exports a valid component
import { useNavigation } from '@react-navigation/native';

export default function ScanCamera() {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaLibraryPermission, requestMediaLibraryPermission] = MediaLibrary.usePermissions();
  const [cameraProps, setCameraProps] = useState({
    zoom: 0,
    facing: 'front',
    flash: 'on',
  });
  const [image, setImage] = useState(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const cameraRef = useRef(null);
  console.log('agyaaaaaaaa')

  useEffect(() => {
    if (
      cameraPermission &&
      cameraPermission.granted &&
      mediaLibraryPermission &&
      mediaLibraryPermission.status === 'granted'
    ) {
      getLastSavedImage();
    }
  }, [cameraPermission, mediaLibraryPermission]);


  if (!cameraPermission || !mediaLibraryPermission) {
    return <View />;
  }

  if (!cameraPermission.granted || mediaLibraryPermission.status !== 'granted') {
    return (
      <View style={styles.container}>
        <Text>We need camera and gallery permissions to continue.</Text>
        <TouchableOpacity style={styles.button} onPress={() => {
          requestCameraPermission();
          requestMediaLibraryPermission();
        }}>
          <Text style={styles.buttonText}>Grant Permissions</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleFacesDetected = ({ faces }) => {
    setFaceDetected(faces.length > 0);
  };

  const markAttendance = () => {
    Alert.alert(
      faceDetected ? 'Attendance Marked' : 'No Face Detected',
      faceDetected ? 'Your face has been detected and attendance is marked.' : 'Please ensure your face is visible to mark attendance.'
    );
    setFaceDetected(false);
  };

  return (
    <View style={styles.container}>
      {!image ? (
        <>
          <Camera
            style={styles.camera}
            type={cameraProps.facing}
            flashMode={cameraProps.flash}
            ref={cameraRef}
            onFacesDetected={handleFacesDetected}
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.fast,
              detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
              runClassifications: FaceDetector.FaceDetectorClassifications.none,
            }}
          />
          <View style={styles.bottomControlsContainer}>
            <Button icon="camera" size={60} onPress={markAttendance} />
            <Button
              icon="flip-camera-ios"
              onPress={() => setCameraProps(current => ({
                ...current,
                facing: current.facing === Camera.Constants.Type.front
                  ? Camera.Constants.Type.back
                  : Camera.Constants.Type.front,
              }))}
              size={40}
            />
          </View>
        </>
      ) : (
        <Image source={{ uri: image }} style={styles.camera} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  bottomControlsContainer: {
    height: 100,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
