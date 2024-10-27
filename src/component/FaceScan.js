import React, {useState, useEffect} from 'react';
import {
  View,
  Button,
  Image,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {CameraView, useCameraPermissions} from 'expo-camera';
import axios from 'axios';
import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator';
import Instance from '../ServiceModule/Service';
import {IMAGE_PATH} from '../ServiceModule/Image'
const FaceScan = () => {
    console.log('image ka path',IMAGE_PATH)
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaLibraryPermissionResponse, requestMediaLibraryPermission] =
    MediaLibrary.usePermissions();
  const [cameraProps, setCameraProps] = useState({
    zoom: 0,
    facing: 'front',
    flash: 'on',
    animateShutter: false,
    enableTorch: false,
  });

  useEffect(() => {
    if (
      cameraPermission?.granted &&
      mediaLibraryPermissionResponse?.status === 'granted'
    ) {
      setHasPermission(true);
    } else if (cameraPermission && mediaLibraryPermissionResponse) {
      setHasPermission(false);
    }
  }, [cameraPermission, mediaLibraryPermissionResponse]);

  if (!cameraPermission || !mediaLibraryPermissionResponse) {
    return (
      <View>
        <Text>Loading permissions...</Text>
      </View>
    );
  }

  if (
    !cameraPermission.granted ||
    mediaLibraryPermissionResponse.status !== 'granted'
  ) {
    return (
      <View style={styles.container}>
        <Text>We need camera and gallery permissions to continue.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            requestCameraPermission();
            requestMediaLibraryPermission();
          }}>
          <Text style={styles.buttonText}>Grant Permissions</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const captureImage = async () => {
    console.log('hello image capture hogi');
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync({base64: true});
      console.log('to khich meri photo');
      setImageUri(photo.uri);
      checkFaceRecognition(photo.uri);
    }
  };

  const compressAndConvertImage = async uri => {
    console.log('convert plzzz');
    try {
      // Resize the image to a smaller resolution
      const resizedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{resize: {width: 150, height: 150}}],
        {compress: 0.7, format: ImageManipulator.SaveFormat.JPEG},
      );
      console.log('hello hello resize image');
      return resizedImage.base64;
    } catch (error) {
      console.error('Error compressing image:', error);
      Alert.alert('Error', 'Image compression failed.');
      return null;
    }
  };

  const checkFaceRecognition = async uri => {
    console.log('uri mili kya', uri);
    // const compressedImage = await compressAndConvertImage(uri);
    const compressedImage = IMAGE_PATH + uri;
    console.log('imge compress hui kya', compressedImage);
    if (!compressedImage) return;

    try {
        console.log('in try')
      const response = await Instance.post('scanning/attendance/mark', {
        scannedImageUrl: compressedImage,
        action: 'in',
      });
      console.log('there is something in resonse',response.data)

      if (response.data.isPresent) {
        Alert.alert('Attendance marked!', 'User is present.');
      } else {
        Alert.alert('Attendance not marked', 'User is not recognized.');
      }

      setAttendanceData(response.data);
    } catch (error) {
      console.error('Error checking attendance:', error);
      Alert.alert('Error', 'There was an error checking attendance.');
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={cameraProps.facing}
        ref={ref => setCameraRef(ref)}
      />
      <View style={styles.buttonContainer}>
        <Button title="Capture" onPress={captureImage} />
      </View>
      {imageUri && <Image source={{uri: imageUri}} style={styles.image} />}
      {attendanceData && (
        <Text>Attendance Data: {JSON.stringify(attendanceData)}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    margin: 10,
  },
});

export default FaceScan;
