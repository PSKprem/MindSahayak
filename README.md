# MindSahayak – AI-Powered Mental Health Companion for Students

> A multilingual AI chatbot that offers emotional support, picks up early signs of distress, and points students in India to helplines and self-help resources.

## Problem Statement

Students in India, especially in Tier 2 and Tier 3 cities, face exam anxiety, chronic stress and depression. Social stigma, language barriers and too few counsellors mean many of them suffer in silence. MindSahayak is a private, always-available companion that speaks their language.

## Key Features

- 🤖 **Empathetic AI counsellor ("Aanya")**: Google Gemini with a carefully designed system prompt that understands Indian academic and family pressure.
- 🧠 **Conversation memory**: every chat is saved in **MongoDB**, so the bot remembers past sessions (e.g. *"Last time you mentioned your exams..."*).
- 😟 **Emotion detection**: a Hugging Face Transformer model (RoBERTa-based) scores each user message for emotions and finds the dominant one.
- 🚨 **Crisis detection & escalation**: high-risk messages trigger an urgent reply with Indian helplines (Vandrevala, iCall, AASRA), and the user is flagged for follow-up.
- 🗂️ **Context building**: each prompt gets the user's emotional summary, the main topics they've discussed (studies, family, career, stress, sleep...) and their recent messages.
- 🌐 **Multilingual**: English, Hindi and Hinglish.
- 📱 **Mobile app**: a React Native (Expo) app with Home, Chatbot, Resources, Helpline and About screens.

## Architecture

```
React Native App (Expo)
        │  REST API
        ▼
Python Backend ── UserChatManager (terminal_chat.py)
        │
        ├── Crisis Detector ─────────► risk level (high / medium / low)
        ├── Emotion Detector (HF) ───► emotion scores + dominant emotion
        ├── Context Builder ─────────► emotions + topics + last 5 messages
        ├── LangChain
        │     ChatPromptTemplate (system prompt + history + input)
        │     RunnableWithMessageHistory
        │     ChatGoogleGenerativeAI (gemini-1.5-flash, temperature 0.7)
        └── MongoDB (chatbot_db.chat_histories)
```

### Request flow

1. The user sends a message.
2. The crisis detector checks the risk level.
3. The emotion detector scores the message, and the message is saved to MongoDB.
4. A context block is built from the dominant emotion, top emotions, key topics and recent messages.
5. Gemini generates a reply through LangChain, using the user's message history.
6. If the risk is high or medium, the helpline numbers are added to the start of the reply.
7. The reply is saved to MongoDB and returned to the user.

### MongoDB document (one per user)

```json
{
  "user_id": "abc123",
  "created_at": "2025-08-01 10:15:00",
  "needs_follow_up": false,
  "chat_history": [
    {
      "role": "user",
      "content": "I am very stressed about my exams",
      "timestamp": "2025-08-01 10:16:02",
      "emotions": { "sadness": 0.62, "fear": 0.21, "joy": 0.03 },
      "dominant_emotion": "sadness",
      "crisis_detected": { "is_crisis": false }
    },
    { "role": "assistant", "content": "...", "timestamp": "..." }
  ]
}
```

## Tech Stack

| Layer        | Technology |
|--------------|------------|
| LLM          | Google Gemini (`gemini-1.5-flash`) |
| LLM framework| LangChain (`langchain-google-genai`, `langchain-core`, `langchain-community`) |
| NLP          | Hugging Face Transformers (emotion classification), PyTorch |
| Backend      | Python, Flask (REST API), python-dotenv |
| Database     | MongoDB (`pymongo`) |
| Mobile app   | React Native, Expo, React Navigation, Lottie, react-native-chart-kit, Firebase |

## Project Structure

```
MindSahayak/
├── terminal_chat.py      # Core backend: UserChatManager (LLM, memory, MongoDB, crisis flow)
├── README.md
└── Frontend/             # React Native (Expo) app
    ├── App.js
    ├── navigation/AppNavigator.js   # Stack + bottom tab navigation
    ├── context/ThemeContext.js
    └── screens/
        ├── SplashScreen.js
        ├── AuthScreen.js
        ├── HomeScreen.js
        ├── ChatbotScreen.js
        ├── ResourcesScreen.js
        ├── HelplineScreen.js
        └── AboutScreen.js
```

## Getting Started

### Backend

```bash
git clone https://github.com/PSKprem/MindSahayak.git
cd MindSahayak

pip install langchain-google-genai langchain-core langchain-community pymongo python-dotenv transformers torch flask
```

Create a `.env` file in the project root. **Never commit this file.**

```env
GOOGLE_API_KEY=your_gemini_api_key
MONGO_CONNECTION_STRING=mongodb+srv://<user>:<password>@<cluster>/
```

### Mobile app

```bash
cd Frontend
npm install
npx expo start
```

Scan the QR code with the Expo Go app, or press `a` (Android) or `w` (web).

## Crisis Helplines (India)

| Service | Number | Availability |
|---------|--------|--------------|
| Vandrevala Foundation | 1860-2662-345 / 1800-2333-330 | 24/7 |
| iCall | +91-9152987821 | Mon–Sat, 10am–8pm |
| AASRA | +91-9820466726 | 24/7 |

> ⚠️ MindSahayak is a support tool. It does **not** replace professional mental-health care.

## Roadmap

- Connect the mobile chat screen to the backend API end to end.
- Add user authentication (JWT / Firebase Auth) and encrypt stored chats.
- Use a multilingual emotion model (e.g. XLM-RoBERTa / IndicBERT) for Hindi/Hinglish.
- Build a mood-trend dashboard and self-help content (videos, breathing exercises).
- Add optional escalation to human counsellors or peer listeners.
