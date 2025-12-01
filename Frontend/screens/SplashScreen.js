import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Canvas, useFrame } from '@react-three/fiber/native';
import { ExpoWebGLRenderingContext } from 'expo-gl';
import * as THREE from 'three';
import * as Font from 'expo-font';
import LottieView from 'lottie-react-native';

const SplashScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    Font.loadAsync({
      'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
      'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
    });
  }, []);

  const ThreeDScene = () => {
    const sceneRef = useRef<THREE.Scene>();
    const cameraRef = useRef<THREE.PerspectiveCamera>();
    const rendererRef = useRef<THREE.WebGLRenderer>();
    const sphereRef = useRef<THREE.Mesh>();

    const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
      // Create renderer
      rendererRef.current = new THREE.WebGLRenderer({
        canvas: {
          width: gl.drawingBufferWidth,
          height: gl.drawingBufferHeight,
          style: {},
          addEventListener: () => {},
          removeEventListener: () => {},
          clientHeight: gl.drawingBufferHeight,
        },
        context: gl,
      });
      rendererRef.current.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

      // Scene setup
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(
        75,
        gl.drawingBufferWidth / gl.drawingBufferHeight,
        0.1,
        1000
      );
      camera.position.z = 5;
      cameraRef.current = camera;

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const material = new THREE.MeshStandardMaterial({
        color: 0x4a90e2,
        roughness: 0.1,
        metalness: 0.7,
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphereRef.current = sphere;
      scene.add(sphere);

      const animate = () => {
        requestAnimationFrame(animate);
        if (sphereRef.current) {
          sphereRef.current.rotation.x += 0.01;
          sphereRef.current.rotation.y += 0.01;
        }
        rendererRef.current?.render(sceneRef.current!, cameraRef.current!);
        gl.endFrameEXP();
      };
      animate();
    };

    return (
      <Canvas
        style={{ flex: 1 }}
        onCreated={onContextCreate}
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.animationContainer}>
        <ThreeDScene />
      </View>
      
      {/* Rest of your component remains the same */}
    </View>
  );
};

// Your styles remain unchanged
const styles = StyleSheet.create({
  // ... keep your existing styles
});

export default SplashScreen;