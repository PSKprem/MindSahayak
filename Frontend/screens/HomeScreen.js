import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Animated, FlatList } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, Feather } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';

const { width: screenWidth } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  
  const carouselItems = [
    {
      title: "You're Not Alone",
      text: "Millions of people struggle with mental health. We're here to help.",
      color: "#4a90e2",
      icon: "people-outline"
    },
    {
      title: "Track Your Mood",
      text: "Our chatbot helps you understand and track your emotional patterns.",
      color: "#9c64a6",
      icon: "analytics-outline"
    },
    {
      title: "Self-Care Resources",
      text: "Access videos, books, and exercises to help you feel better.",
      color: "#e76f51",
      icon: "book-outline"
    },
    {
      title: "Immediate Help",
      text: "Connect with professionals when you need urgent support.",
      color: "#2a9d8f",
      icon: "help-circle-outline"
    }
  ];

  const features = [
    {
      id: '1',
      title: 'Chatbot',
      description: 'Talk to our empathetic AI companion',
      icon: 'chatbubbles-outline',
      color: '#4a90e2',
      screen: 'Chatbot'
    },
    {
      id: '2',
      title: 'Resources',
      description: 'Videos, books & self-help guides',
      icon: 'book-outline',
      color: '#9c64a6',
      screen: 'Resources'
    },
    {
      id: '3',
      title: 'Mood Tracker',
      description: 'Track your emotional patterns',
      icon: 'analytics-outline',
      color: '#e76f51',
      screen: 'MoodTracker'
    },
    {
      id: '4',
      title: 'Helpline',
      description: 'Immediate professional support',
      icon: 'call-outline',
      color: '#2a9d8f',
      screen: 'Helpline'
    }
  ];

  const renderCarouselItem = ({ item, index }) => {
    return (
      <View style={[styles.carouselItem, { backgroundColor: item.color }]}>
        <Ionicons name={item.icon} size={50} color="white" style={styles.carouselIcon} />
        <Text style={styles.carouselTitle}>{item.title}</Text>
        <Text style={styles.carouselText}>{item.text}</Text>
      </View>
    );
  };

  const renderFeatureItem = ({ item }) => {
    return (
      <TouchableOpacity 
        style={[styles.featureCard, { backgroundColor: item.color }]}
        onPress={() => navigation.navigate(item.screen)}
      >
        <Ionicons name={item.icon} size={30} color="white" />
        <Text style={styles.featureTitle}>{item.title}</Text>
        <Text style={styles.featureDescription}>{item.description}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MindSahayak</Text>
        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#4a90e2" />
        </TouchableOpacity>
      </View>

      {/* Carousel */}
      <View style={styles.carouselContainer}>
        <Carousel
          ref={carouselRef}
          data={carouselItems}
          renderItem={renderCarouselItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth - 80}
          onSnapToItem={(index) => setActiveSlide(index)}
          layout="default"
          loop
          autoplay
          autoplayInterval={5000}
        />
        <View style={styles.pagination}>
          {carouselItems.map((_, index) => (
            <View 
              key={index} 
              style={[
                styles.paginationDot, 
                activeSlide === index && styles.paginationDotActive
              ]} 
            />
          ))}
        </View>
      </View>

      {/* Features Grid */}
      <Text style={styles.sectionTitle}>How Can We Help?</Text>
      <FlatList
        data={features}
        renderItem={renderFeatureItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.featuresGrid}
        scrollEnabled={false}
      />

      {/* Mission Section */}
      <View style={styles.missionContainer}>
        <Text style={styles.missionTitle}>Our Mission</Text>
        <Text style={styles.missionText}>
          To provide accessible mental health support to students and young adults, 
          using AI to detect and respond to emotional needs with empathy and care.
        </Text>
        
        <TouchableOpacity 
          style={styles.teamButton}
          onPress={() => navigation.navigate('About')}
        >
          <Text style={styles.teamButtonText}>Meet Our Team</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Animation */}
      <LottieView
        source={require('../assets/animations/peace.json')}
        autoPlay
        loop
        style={styles.bottomAnimation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    color: '#4a90e2',
  },
  carouselContainer: {
    marginBottom: 30,
  },
  carouselItem: {
    borderRadius: 20,
    height: 180,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  carouselIcon: {
    marginBottom: 10,
  },
  carouselTitle: {
    fontSize: 22,
    fontFamily: 'Montserrat-Bold',
    color: 'white',
    marginBottom: 5,
  },
  carouselText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: 'white',
    opacity: 0.9,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: '#4a90e2',
    width: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    color: '#333',
    marginBottom: 15,
  },
  featuresGrid: {
    paddingBottom: 20,
  },
  featureCard: {
    flex: 1,
    margin: 8,
    borderRadius: 15,
    padding: 20,
    minHeight: 150,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  featureTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: 'white',
    marginVertical: 10,
  },
  featureDescription: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: 'white',
    opacity: 0.9,
  },
  missionContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginTop: 10,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  missionTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: '#4a90e2',
    marginBottom: 10,
  },
  missionText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#666',
    lineHeight: 22,
    marginBottom: 15,
  },
  teamButton: {
    alignSelf: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#4a90e2',
  },
  teamButtonText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    color: '#4a90e2',
  },
  bottomAnimation: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default HomeScreen;