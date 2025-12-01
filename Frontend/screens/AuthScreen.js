import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LottieView from 'lottie-react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AuthScreen = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigation = useNavigation();
  const animationProgress = new Animated.Value(0);

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(animationProgress, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  }, []);

  const handleAuth = () => {
    // Handle authentication logic here
    navigation.navigate('Home');
  };

  const handleAnonymous = () => {
    // Handle anonymous login
    navigation.navigate('Home');
  };

  return (
    <LinearGradient
      colors={['#e3f2fd', '#bbdefb', '#90caf9']}
      style={styles.container}
    >
      <View style={styles.header}>
        <LottieView
          source={require('../assets/animations/wave.json')}
          autoPlay
          loop
          style={styles.waveAnimation}
        />
        <Text style={styles.title}>MindSahayak</Text>
        <Text style={styles.subtitle}>Your mental health companion</Text>
      </View>

      <View style={styles.authContainer}>
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'login' && styles.activeTab]}
            onPress={() => setActiveTab('login')}
          >
            <Text style={[styles.tabText, activeTab === 'login' && styles.activeTabText]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'signup' && styles.activeTab]}
            onPress={() => setActiveTab('signup')}
          >
            <Text style={[styles.tabText, activeTab === 'signup' && styles.activeTabText]}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          {activeTab === 'signup' && (
            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#5c6bc0" />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
                placeholderTextColor="#7986cb"
              />
            </View>
          )}

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#5c6bc0" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholderTextColor="#7986cb"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#5c6bc0" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#7986cb"
            />
          </View>

          <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
            <Text style={styles.authButtonText}>
              {activeTab === 'login' ? 'Login' : 'Sign Up'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.orText}>or</Text>

          <TouchableOpacity style={styles.anonymousButton} onPress={handleAnonymous}>
            <Text style={styles.anonymousButtonText}>Continue Anonymously</Text>
          </TouchableOpacity>
        </View>
      </View>

      <LottieView
        source={require('../assets/animations/meditation.json')}
        autoPlay
        loop
        style={styles.bottomAnimation}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  waveAnimation: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Montserrat-Bold',
    color: '#3949ab',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: '#5c6bc0',
  },
  authContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e8eaf6',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#3949ab',
  },
  tabText: {
    fontFamily: 'Montserrat-Regular',
    color: '#7986cb',
    fontSize: 16,
  },
  activeTabText: {
    fontFamily: 'Montserrat-Bold',
    color: '#3949ab',
  },
  form: {
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d1d9ff',
    marginBottom: 20,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontFamily: 'Montserrat-Regular',
    color: '#3949ab',
    fontSize: 16,
    paddingVertical: 8,
  },
  authButton: {
    backgroundColor: '#3949ab',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#3949ab',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  authButtonText: {
    color: 'white',
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
  orText: {
    textAlign: 'center',
    marginVertical: 15,
    fontFamily: 'Montserrat-Regular',
    color: '#7986cb',
  },
  anonymousButton: {
    borderWidth: 1,
    borderColor: '#3949ab',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  anonymousButtonText: {
    color: '#3949ab',
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
  bottomAnimation: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default AuthScreen;