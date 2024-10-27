import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { faceDetectionProcessor } from 'vision-camera-face-detector';

const FaceDetect = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedFaces, setDetectedFaces] = useState([]);
  const cameraRef = useRef(null);
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices?.front || devices?.back;

  useEffect(() => {
    const requestPermissions = async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      setHasPermission(cameraPermission === 'authorized');
    };
    requestPermissions();
  }, []);

  const toggleFaceDetection = () => {
    setIsDetecting((prevState) => !prevState);
    if (!isDetecting) setDetectedFaces([]);
  };

  const renderFaceBoxes = () => {
    return detectedFaces.map((face, index) => (
      <View
        key={index}
        style={[
          styles.faceBox,
          {
            left: face.bounds.origin.x,
            top: face.bounds.origin.y,
            width: face.bounds.size.width,
            height: face.bounds.size.height,
          },
        ]}
      />
    ));
  };

  if (!device || !hasPermission) {
    return <View style={styles.container}><Text>Loading Camera...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isDetecting}
        onFrameProcessor={isDetecting ? faceDetectionProcessor : undefined}
        frameProcessorFps={2}
      />
      {isDetecting && renderFaceBoxes()}
      <TouchableOpacity style={styles.button} onPress={toggleFaceDetection}>
        <Text style={styles.buttonText}>
          {isDetecting ? 'Stop Detection' : 'Start Face Detection'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  faceBox: {
    position: 'absolute',
    borderColor: 'green',
    borderWidth: 2,
  },
  button: {
    backgroundColor: '#03498db',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default FaceDetect;
