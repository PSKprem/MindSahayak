import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Animated, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import * as Speech from 'expo-speech';
import { LinearGradient } from 'expo-linear-gradient';
import { Chart, Line, Area, HorizontalAxis, VerticalAxis } from 'react-native-responsive-linechart';

const { width } = Dimensions.get('window');

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  sentiment?: number;
  timestamp: Date;
};

const sentimentData = [
  { x: 1, y: 0.5 },
  { x: 2, y: 0.7 },
  { x: 3, y: 0.3 },
  { x: 4, y: -0.2 },
  { x: 5, y: -0.5 },
  { x: 6, y: 0.1 },
  { x: 7, y: 0.8 },
];

const ChatbotScreen = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi there! I\'m MindSahayak. How are you feeling today?',
      sender: 'bot',
      sentiment: 0.8,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [activeTab, setActiveTab] = useState('chat');
  const [isListening, setIsListening] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const analyzeSentiment = (text: string): number => {
    // Simple sentiment analysis (in a real app, use an API)
    const positiveWords = ['happy', 'good', 'great', 'awesome', 'joy', 'love'];
    const negativeWords = ['sad', 'bad', 'awful', 'hate', 'angry', 'depressed'];
    
    const words = text.toLowerCase().split(' ');
    let score = 0;
    
    words.forEach(word => {
      if (positiveWords.includes(word)) score += 0.2;
      if (negativeWords.includes(word)) score -= 0.2;
    });
    
    return Math.max(-1, Math.min(1, score));
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      sentiment: analyzeSentiment(inputText),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponses = [
        "I hear you. Can you tell me more about how you're feeling?",
        "That sounds challenging. Remember, it's okay to feel this way.",
        "I appreciate you sharing that with me. What's been on your mind lately?",
        "Your feelings are valid. Would you like to explore this further?",
        "I'm here to listen. What else would you like to talk about?",
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: 'bot',
        sentiment: 0.7,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000 + Math.random() * 2000);
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isUser = item.sender === 'user';
    
    return (
      <Animated.View 
        style={[
          styles.messageContainer,
          isUser ? styles.userMessage : styles.botMessage,
          { opacity: fadeAnim }
        ]}
      >
        {!isUser && (
          <View style={styles.botAvatar}>
            <Ionicons name="happy-outline" size={20} color="#4a90e2" />
          </View>
        )}
        
        <LinearGradient
          colors={isUser ? ['#4a90e2', '#5b9bed'] : ['#f0f4f8', '#e0e9f2']}
          start={[0, 0]}
          end={[1, 1]}
          style={[
            styles.messageBubble,
            isUser ? styles.userBubble : styles.botBubble,
          ]}
        >
          <Text style={isUser ? styles.userText : styles.botText}>{item.text}</Text>
          
          {item.sentiment !== undefined && (
            <View style={styles.sentimentIndicator}>
              <FontAwesome 
                name={item.sentiment > 0.3 ? 'smile-o' : item.sentiment < -0.3 ? 'frown-o' : 'meh-o'} 
                size={14} 
                color={item.sentiment > 0.3 ? '#2ecc71' : item.sentiment < -0.3 ? '#e74c3c' : '#f39c12'} 
              />
              <Text style={styles.sentimentText}>
                {item.sentiment > 0.3 ? 'Positive' : item.sentiment < -0.3 ? 'Negative' : 'Neutral'}
              </Text>
            </View>
          )}
        </LinearGradient>
        
        {isUser && (
          <View style={styles.userAvatar}>
            <Ionicons name="person-outline" size={20} color="white" />
          </View>
        )}
      </Animated.View>
    );
  };

  const renderSentimentChart = () => {
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Your Mood Over Time</Text>
        
        <Chart
          style={{ height: 200, width: '100%' }}
          data={sentimentData}
          padding={{ left: 40, bottom: 20, right: 20, top: 20 }}
          xDomain={{ min: 1, max: 7 }}
          yDomain={{ min: -1, max: 1 }}
        >
          <VerticalAxis 
            tickCount={5} 
            theme={{ labels: { formatter: (v) => v.toFixed(1) } }} 
          />
          <HorizontalAxis tickCount={7} />
          <Area 
            theme={{ 
              gradient: { 
                from: { color: '#4a90e2', opacity: 0.4 }, 
                to: { color: '#4a90e2', opacity: 0.1 } 
              } 
            }} 
          />
          <Line 
            theme={{ 
              stroke: { color: '#4a90e2', width: 2 },
              scatter: { default: { width: 4, height: 4, rx: 2 } }
            }} 
            smoothing="cubic-spline"
          />
        </Chart>
        
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#2ecc71' }]} />
            <Text style={styles.legendText}>Positive</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#f39c12' }]} />
            <Text style={styles.legendText}>Neutral</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#e74c3c' }]} />
            <Text style={styles.legendText}>Negative</Text>
          </View>
        </View>
      </View>
    );
  };

  const renderReport = () => {
    // Calculate average sentiment
    const userMessages = messages.filter(m => m.sender === 'user');
    const avgSentiment = userMessages.reduce((sum, m) => sum + (m.sentiment || 0), 0) / (userMessages.length || 1);
    
    return (
      <View style={styles.reportContainer}>
        <Text style={styles.reportTitle}>Your Mental Health Report</Text>
        
        <View style={styles.reportCard}>
          <Text style={styles.reportCardTitle}>Conversation Summary</Text>
          <Text style={styles.reportCardText}>
            You've had {userMessages.length} conversations with MindSahayak.
          </Text>
        </View>
        
        <View style={styles.reportCard}>
          <Text style={styles.reportCardTitle}>Average Mood</Text>
          <View style={styles.sentimentScoreContainer}>
            <FontAwesome 
              name={avgSentiment > 0.3 ? 'smile-o' : avgSentiment < -0.3 ? 'frown-o' : 'meh-o'} 
              size={30} 
              color={avgSentiment > 0.3 ? '#2ecc71' : avgSentiment < -0.3 ? '#e74c3c' : '#f39c12'} 
            />
            <Text style={styles.sentimentScoreText}>
              {avgSentiment > 0.3 ? 'Positive' : avgSentiment < -0.3 ? 'Negative' : 'Neutral'} ({avgSentiment.toFixed(2)})
            </Text>
          </View>
        </View>
        
        <View style={styles.reportCard}>
          <Text style={styles.reportCardTitle}>Recommendations</Text>
          <Text style={styles.reportCardText}>
            {avgSentiment > 0.3 
              ? "You seem to be in good spirits! Keep up the positive mindset."
              : avgSentiment < -0.3 
              ? "Consider trying some relaxation exercises or speaking with a professional."
              : "You might benefit from our self-help resources to boost your mood."}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#4a90e2', '#5b9bed']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>MindSahayak Chat</Text>
        
        <View style={styles.tabs}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'chat' && styles.activeTab]}
            onPress={() => setActiveTab('chat')}
          >
            <Ionicons name="chatbubbles-outline" size={20} color={activeTab === 'chat' ? 'white' : 'rgba(255,255,255,0.7)'} />
            <Text style={[styles.tabText, activeTab === 'chat' && styles.activeTabText]}>Chat</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'analysis' && styles.activeTab]}
            onPress={() => setActiveTab('analysis')}
          >
            <MaterialIcons name="insert-chart-outlined" size={20} color={activeTab === 'analysis' ? 'white' : 'rgba(255,255,255,0.7)'} />
            <Text style={[styles.tabText, activeTab === 'analysis' && styles.activeTabText]}>Analysis</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'report' && styles.activeTab]}
            onPress={() => setActiveTab('report')}
          >
            <Ionicons name="document-text-outline" size={20} color={activeTab === 'report' ? 'white' : 'rgba(255,255,255,0.7)'} />
            <Text style={[styles.tabText, activeTab === 'report' && styles.activeTabText]}>Report</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Content */}
      <View style={styles.content}>
        {activeTab === 'chat' ? (
          <>
            <FlatList
              ref={flatListRef}
              data={messages}
              renderItem={renderMessage}
              keyExtractor={item => item.id}
              style={styles.messagesList}
              contentContainerStyle={styles.messagesListContent}
              onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
              onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
            />
            
            <View style={styles.inputContainer}>
              <TouchableOpacity 
                style={styles.voiceButton}
                onPress={() => setIsListening(!isListening)}
              >
                <Ionicons 
                  name={isListening ? "mic-off-outline" : "mic-outline"} 
                  size={24} 
                  color={isListening ? "#e74c3c" : "#4a90e2"} 
                />
              </TouchableOpacity>
              
              <TextInput
                style={styles.input}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Type your message..."
                placeholderTextColor="#999"
                multiline
              />
              
              <TouchableOpacity 
                style={styles.sendButton}
                onPress={handleSend}
                disabled={!inputText.trim()}
              >
                <Ionicons 
                  name="send" 
                  size={24} 
                  color={inputText.trim() ? "#4a90e2" : "#ccc"} 
                />
              </TouchableOpacity>
            </View>
          </>
        ) : activeTab === 'analysis' ? (
          renderSentimentChart()
        ) : (
          renderReport()
        )}
      </View>
      
      {/* Bot Animation */}
      {activeTab === 'chat' && (
        <LottieView
          source={require('../assets/animations/chatbot.json')}
          autoPlay
          loop
          style={styles.botAnimation}
        />
      )}
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
    paddingBottom: 20,
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
    marginBottom: 20,
    textAlign: 'center',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  tab: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: 'rgba(255,255,255,0.7)',
    marginTop: 5,
  },
  activeTabText: {
    color: 'white',
    fontFamily: 'Montserrat-Bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  messagesList: {
    flex: 1,
  },
  messagesListContent: {
    paddingBottom: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-end',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  botMessage: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  userBubble: {
    borderBottomRightRadius: 0,
    marginLeft: 10,
  },
  botBubble: {
    borderBottomLeftRadius: 0,
    marginRight: 10,
  },
  userText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: 'white',
  },
  botText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: '#333',
  },
  sentimentIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  sentimentText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    marginLeft: 5,
    color: '#666',
  },
  userAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#4a90e2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  botAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f0f4f8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    maxHeight: 100,
    marginHorizontal: 10,
  },
  voiceButton: {
    padding: 5,
  },
  sendButton: {
    padding: 5,
  },
  botAnimation: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 80,
    height: 80,
    zIndex: -1,
  },
  chartContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    color: '#4a90e2',
    marginBottom: 15,
    textAlign: 'center',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    fontFamily: 'Montserrat-Regular',
    color: '#666',
  },
  reportContainer: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
    color: '#4a90e2',
    marginBottom: 20,
    textAlign: 'center',
  },
  reportCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  reportCardTitle: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: '#4a90e2',
    marginBottom: 10,
  },
  reportCardText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: '#666',
    lineHeight: 20,
  },
  sentimentScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  sentimentScoreText: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    color: '#666',
    marginLeft: 10,
  },
});

export default ChatbotScreen;