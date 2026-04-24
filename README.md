# BaoBao Land

A mobile-first Expo MVP for a children's Mandarin learning app. BaoBao Land teaches ages 3-8 with short lessons, tap-to-hear pronunciation, repeat practice, matching games, story slides, and a simple parent dashboard.

## Tech Stack

- React Native with Expo
- Firebase Authentication, Firestore, and Storage service boundaries
- Google Text-to-Speech and Speech-to-Text endpoint hooks
- Mock mode for local development without cloud credentials

## Project Structure

```text
.
├── App.tsx
├── app.json
├── package.json
├── src
│   ├── components
│   │   ├── KidButton.tsx
│   │   ├── ProgressPills.tsx
│   │   ├── Screen.tsx
│   │   └── TopBar.tsx
│   ├── data
│   │   ├── imageMap.tsx
│   │   └── sampleData.ts
│   ├── screens
│   │   ├── AuthScreen.tsx
│   │   ├── GameScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── LessonScreen.tsx
│   │   ├── ParentDashboardScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── StoryScreen.tsx
│   ├── services
│   │   ├── audio.ts
│   │   └── firebase.ts
│   ├── theme
│   │   └── colors.ts
│   └── types
│       └── index.ts
└── tsconfig.json
```

## Run

```bash
npm install
npm run start
```

The app runs in mock mode when Firebase and API endpoints are blank. Parent auth accepts the prefilled credentials locally, profile saves no-op locally, TTS uses on-device Expo speech, and pronunciation feedback returns a simple mock pass or retry.

## Firebase Collections

```text
users/{uid}
  email
  createdAt

child_profiles/{childId}
  parentId
  name
  age
  level
  updatedAt

lessons/{lessonId}
  title
  theme
  words[]

progress/{childId}
  stars
  coins
  streakDays
  lessonsCompleted[]
  wordsLearned[]
  updatedAt

rewards/{rewardId}
  name
  type
  unlockRule
```

## Cloud API Notes

Set these values in `app.json` under `expo.extra`:

```json
{
  "firebaseApiKey": "...",
  "firebaseAuthDomain": "...",
  "firebaseProjectId": "...",
  "firebaseStorageBucket": "...",
  "firebaseMessagingSenderId": "...",
  "firebaseAppId": "...",
  "googleTtsEndpoint": "https://your-cloud-function/tts",
  "googleSttEndpoint": "https://your-cloud-function/stt"
}
```

For production, keep Google API keys on a server or Firebase Cloud Function. The mobile app should call your own HTTPS endpoint, not Google APIs directly with a client-side secret.

## Included MVP Flow

- Parent login/signup screen
- Child profile editor with name, age, and level
- Home screen with BaoBao mascot, daily lesson, stars, coins, and level
- Lesson screen with 5 Mandarin words: 猫, 狗, 鸟, 鱼, 熊猫
- Tap-to-hear Chinese pronunciation
- Repeat-after-audio microphone practice with simple feedback
- Matching mini game with star and coin rewards
- Story mode with 5 scenes
- Parent dashboard with lessons, words, streaks, and badges
