import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

const AboutScreen = () => {
  const teamMembers = [
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      role: 'Clinical Psychologist',
      bio: 'Specializes in adolescent mental health with 10+ years of experience.',
      image: require('../assets/images/team1.jpg')
    },
    {
      id: '2',
      name: 'Ramraj Nagar ',
      role: 'AI/NLP Engineer',
      bio: 'Developed the sentiment analysis and chatbot conversation models.',
      image: require('../assets/images/team2.jpg')
    },
    {
      id: '3',
      name: 'Hirnaya Patil',
      role: 'UX Designer',
      bio: 'Created the calming and accessible interface of MindSahayak.',
      image: require('../assets/images/team3.jpg')
    },
    {
      id: '4',
      name: 'Janu ',
      role: 'Mobile Developer',
      bio: 'Built the Android and iOS applications for seamless user experience.',
      image: require('../assets/images/team4.jpg')
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>About MindSahayak</Text>
      </View>

      <LottieView
        source={require('../assets/animations/about.json')}
        autoPlay
        loop
        style={styles.topAnimation}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.sectionText}>
          MindSahayak was created to address the growing mental health crisis among 
          students and young adults in India. Our goal is to provide accessible, 
          stigma-free support through technology, combining AI with evidence-based 
          therapeutic approaches.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <View style={styles.feature}>
          <Ionicons name="chatbubbles" size={24} color="#4a90e2" style={styles.featureIcon} />
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>AI-Powered Chatbot</Text>
            <Text style={styles.featureDescription}>
              Our chatbot uses natural language processing to provide empathetic conversations 
              and detect emotional distress signals.
            </Text>
          </View>
        </View>
        <View style={styles.feature}>
          <Ionicons name="analytics" size={24} color="#4a90e2" style={styles.featureIcon} />
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Sentiment Analysis</Text>
            <Text style={styles.featureDescription}>
              Advanced algorithms analyze your mood patterns over time to provide insights 
              and recommendations.
            </Text>
          </View>
        </View>
        <View style={styles.feature}>
          <Ionicons name="school" size={24} color="#4a90e2" style={styles.featureIcon} />
          <View style={styles.featureText}>
            <Text style={styles.featureTitle}>Educational Resources</Text>
            <Text style={styles.featureDescription}>
              Curated content to help you understand and manage your mental health.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Team</Text>
        <Text style={styles.sectionText}>
          MindSahayak is developed by a multidisciplinary team of mental health 
          professionals and technologists committed to making mental health support 
          accessible to all.
        </Text>
        
        {teamMembers.map(member => (
          <View key={member.id} style={styles.teamCard}>
            <Image source={member.image} style={styles.teamImage} />
            <View style={styles.teamInfo}>
              <Text style={styles.teamName}>{member.name}</Text>
              <Text style={styles.teamRole}>{member.role}</Text>
              <Text style={styles.teamBio}>{member.bio}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.sectionText}>
          Have questions or feedback? We'd love to hear from you.
        </Text>
        <Text style={[styles.sectionText, { color: '#4a90e2', marginTop: 10 }]}>
          contact@mindsahayak.org
        </Text>
      </View>
    </ScrollView>
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
    color: '#4a90e2',
  },
  topAnimation: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    color: '#4a90e2',
    marginBottom: 15,
  },
  sectionText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#666',
    lineHeight: 22,
    marginBottom: 10,
  },
  feature: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  featureIcon: {
    marginRight: 15,
    marginTop: 3,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: '#333',
    marginBottom: 5,
  },
  featureDescription: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#666',
    lineHeight: 20,
  },
  teamCard: {
    flexDirection: 'row',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  teamImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: '#333',
    marginBottom: 3,
  },
  teamRole: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#4a90e2',
    marginBottom: 5,
  },
  teamBio: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#666',
    lineHeight: 18,
  },
});

export default AboutScreen;
