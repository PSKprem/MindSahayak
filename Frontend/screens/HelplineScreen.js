import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

const HelplineScreen = () => {
  const helplines = [
    {
      id: '1',
      name: 'National Mental Health Helpline',
      number: '1800-599-0019',
      icon: 'phone-in-talk',
      description: '24/7 support for mental health concerns'
    },
    {
      id: '2',
      name: 'Vandrevala Foundation',
      number: '1860-2662-345',
      icon: 'hand-heart',
      description: 'Free counseling and support'
    },
    {
      id: '3',
      name: 'iCall Psychosocial Helpline',
      number: '9152987821',
      icon: 'chat-processing',
      description: 'Email and chat support available'
    },
    {
      id: '4',
      name: 'Suicide Prevention Helpline',
      number: '044-24640050',
      icon: 'lifebuoy',
      description: 'Immediate crisis intervention'
    },
  ];

  const handleCall = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  const handleWebsite = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Emergency Help</Text>
        <Text style={styles.headerSubtitle}>Immediate support when you need it most</Text>
      </View>

      <LottieView
        source={require('../assets/animations/emergency.json')}
        autoPlay
        loop
        style={styles.topAnimation}
      />

      <View style={styles.helplineContainer}>
        {helplines.map(helpline => (
          <TouchableOpacity 
            key={helpline.id}
            style={styles.helplineCard}
            onPress={() => handleCall(helpline.number)}
          >
            <MaterialCommunityIcons 
              name={helpline.icon} 
              size={30} 
              color="#e74c3c" 
              style={styles.helplineIcon}
            />
            <View style={styles.helplineInfo}>
              <Text style={styles.helplineName}>{helpline.name}</Text>
              <Text style={styles.helplineNumber}>{helpline.number}</Text>
              <Text style={styles.helplineDescription}>{helpline.description}</Text>
            </View>
            <Ionicons name="call" size={24} color="#e74c3c" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.resources}>
        <Text style={styles.resourcesTitle}>Additional Resources</Text>
        
        <TouchableOpacity 
          style={styles.resourceCard}
          onPress={() => handleWebsite('https://www.mind.org.uk')}
        >
          <Text style={styles.resourceText}>Mind.org - Mental Health Information</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.resourceCard}
          onPress={() => handleWebsite('https://www.nimhans.ac.in')}
        >
          <Text style={styles.resourceText}>NIMHANS - Professional Help</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  header: {
    marginTop: 50,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Montserrat-Bold',
    color: '#e74c3c',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: '#666',
  },
  topAnimation: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginVertical: 20,
  },
  helplineContainer: {
    marginBottom: 30,
  },
  helplineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  helplineIcon: {
    marginRight: 15,
  },
  helplineInfo: {
    flex: 1,
  },
  helplineName: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: '#333',
    marginBottom: 3,
  },
  helplineNumber: {
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    color: '#e74c3c',
    marginBottom: 3,
  },
  helplineDescription: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#666',
  },
  resources: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  resourcesTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: '#333',
    marginBottom: 15,
  },
  resourceCard: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  resourceText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#4a90e2',
  },
});

export default HelplineScreen;