import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ResourcesScreen = () => {
  const [activeCategory, setActiveCategory] = useState('videos');
  
  const categories = [
    { id: 'videos', name: 'Videos', icon: 'play-circle' },
    { id: 'books', name: 'Books', icon: 'book' },
    { id: 'exercises', name: 'Exercises', icon: 'fitness-center' },
    { id: 'podcasts', name: 'Podcasts', icon: 'headset' },
  ];
  
  const videos = [
    {
      id: '1',
      title: 'Managing Anxiety',
      duration: '12:45',
      views: '1.2M',
      thumbnail: require('../assets/images/video1.jpg'),
      author: 'Dr. Sarah Johnson'
    },
    {
      id: '2',
      title: 'Mindfulness Meditation',
      duration: '18:30',
      views: '890K',
      thumbnail: require('../assets/images/video2.jpg'),
      author: 'Mindful Moments'
    },
    {
      id: '3',
      title: 'Overcoming Depression',
      duration: '25:15',
      views: '2.4M',
      thumbnail: require('../assets/images/video3.jpg'),
      author: 'Mental Health Foundation'
    },
  ];
  
  const books = [
    {
      id: '1',
      title: 'The Happiness Trap',
      author: 'Dr. Russ Harris',
      cover: require('../assets/images/book1.jpg'),
      rating: 4.7
    },
    {
      id: '2',
      title: 'Feeling Good',
      author: 'Dr. David Burns',
      cover: require('../assets/images/book2.jpg'),
      rating: 4.5
    },
    {
      id: '3',
      title: 'The Mindful Way Through Depression',
      author: 'Mark Williams et al.',
      cover: require('../assets/images/book3.jpg'),
      rating: 4.6
    },
  ];
  
  const exercises = [
    {
      id: '1',
      title: '5-4-3-2-1 Grounding',
      duration: '5 min',
      description: 'A simple technique to manage anxiety by focusing on your senses'
    },
    {
      id: '2',
      title: 'Deep Breathing',
      duration: '10 min',
      description: 'Calm your nervous system with controlled breathing'
    },
    {
      id: '3',
      title: 'Progressive Muscle Relaxation',
      duration: '15 min',
      description: 'Release tension throughout your body systematically'
    },
  ];
  
  const podcasts = [
    {
      id: '1',
      title: 'The Mental Illness Happy Hour',
      author: 'Paul Gilmartin',
      episodes: 500,
      cover: require('../assets/images/podcast1.jpg')
    },
    {
      id: '2',
      title: 'The Hilarious World of Depression',
      author: 'John Moe',
      episodes: 120,
      cover: require('../assets/images/podcast2.jpg')
    },
    {
      id: '3',
      title: 'Terrible, Thanks for Asking',
      author: 'Nora McInerny',
      episodes: 80,
      cover: require('../assets/images/podcast3.jpg')
    },
  ];
  
  const renderCategoryItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[
          styles.categoryItem,
          activeCategory === item.id && styles.activeCategoryItem
        ]}
        onPress={() => setActiveCategory(item.id)}
      >
        <MaterialIcons 
          name={item.icon} 
          size={24} 
          color={activeCategory === item.id ? '#4a90e2' : '#999'} 
        />
        <Text 
          style={[
            styles.categoryText,
            activeCategory === item.id && styles.activeCategoryText
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  
  const renderVideoItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.videoCard}>
        <Image source={item.thumbnail} style={styles.videoThumbnail} />
        <View style={styles.videoDuration}>
          <Text style={styles.videoDurationText}>{item.duration}</Text>
        </View>
        <View style={styles.videoInfo}>
          <Text style={styles.videoTitle}>{item.title}</Text>
          <Text style={styles.videoAuthor}>{item.author}</Text>
          <View style={styles.videoStats}>
            <Ionicons name="eye" size={14} color="#999" />
            <Text style={styles.videoViews}>{item.views} views</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  const renderBookItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.bookCard}>
        <Image source={item.cover} style={styles.bookCover} />
        <View style={styles.bookInfo}>
          <Text style={styles.bookTitle}>{item.title}</Text>
          <Text style={styles.bookAuthor}>{item.author}</Text>
          <View style={styles.bookRating}>
            <FontAwesome name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  
  const renderExerciseItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.exerciseCard}>
        <View style={styles.exerciseIcon}>
          <Ionicons name="fitness" size={24} color="#4a90e2" />
        </View>
        <View style={styles.exerciseInfo}>
          <Text style={styles.exerciseTitle}>{item.title}</Text>
          <Text style={styles.exerciseDuration}>{item.duration}</Text>
          <Text style={styles.exerciseDescription}>{item.description}</Text>
        </View>
        <Ionicons name="play-circle" size={30} color="#4a90e2" />
      </TouchableOpacity>
    );
  };
  
  const renderPodcastItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.podcastCard}>
        <Image source={item.cover} style={styles.podcastCover} />
        <View style={styles.podcastInfo}>
          <Text style={styles.podcastTitle}>{item.title}</Text>
          <Text style={styles.podcastAuthor}>{item.author}</Text>
          <Text style={styles.podcastEpisodes}>{item.episodes} episodes</Text>
        </View>
      </TouchableOpacity>
    );
  };
  
  const renderContent = () => {
    switch (activeCategory) {
      case 'videos':
        return (
          <FlatList
            data={videos}
            renderItem={renderVideoItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
          />
        );
      case 'books':
        return (
          <FlatList
            data={books}
            renderItem={renderBookItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            numColumns={2}
          />
        );
      case 'exercises':
        return (
          <FlatList
            data={exercises}
            renderItem={renderExerciseItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
          />
        );
      case 'podcasts':
        return (
          <FlatList
            data={podcasts}
            renderItem={renderPodcastItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#4a90e2', '#5b9bed']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Self-Help Resources</Text>
        <Text style={styles.headerSubtitle}>Tools to support your mental health journey</Text>
      </LinearGradient>
      
      {/* Categories */}
      <FlatList
        horizontal
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.categoriesList}
        showsHorizontalScrollIndicator={false}
      />
      
      {/* Content */}
      <ScrollView style={styles.content}>
        {renderContent()}
      </ScrollView>
      
      {/* Bottom Animation */}
      <LottieView
        source={require('../assets/animations/reading.json')}
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
  },
  header: {
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: 'rgba(255,255,255,0.9)',
  },
  categoriesList: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoryItem: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#f8f9fa',
  },
  activeCategoryItem: {
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    borderWidth: 1,
    borderColor: '#4a90e2',
  },
  categoryText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#999',
    marginTop: 5,
  },
  activeCategoryText: {
    color: '#4a90e2',
    fontFamily: 'Montserrat-Bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  listContent: {
    paddingBottom: 20,
  },
  videoCard: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  videoThumbnail: {
    width: '100%',
    height: 200,
  },
  videoDuration: {
    position: 'absolute',
    bottom: 80,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  videoDurationText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
  },
  videoInfo: {
    padding: 15,
  },
  videoTitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: '#333',
    marginBottom: 5,
  },
  videoAuthor: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#666',
    marginBottom: 5,
  },
  videoStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoViews: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#999',
    marginLeft: 5,
  },
  bookCard: {
    flex: 1,
    margin: 8,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    overflow: 'hidden',
  },
  bookCover: {
    width: '100%',
    height: 180,
  },
  bookInfo: {
    padding: 10,
  },
  bookTitle: {
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    color: '#333',
    marginBottom: 3,
  },
  bookAuthor: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#666',
    marginBottom: 5,
  },
  bookRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#666',
    marginLeft: 5,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  exerciseIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(74, 144, 226, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseTitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: '#333',
    marginBottom: 3,
  },
  exerciseDuration: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#4a90e2',
    marginBottom: 5,
  },
  exerciseDescription: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#666',
  },
  podcastCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  podcastCover: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  podcastInfo: {
    flex: 1,
  },
  podcastTitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: '#333',
    marginBottom: 3,
  },
  podcastAuthor: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#666',
    marginBottom: 3,
  },
  podcastEpisodes: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#999',
  },
  bottomAnimation: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default ResourcesScreen;