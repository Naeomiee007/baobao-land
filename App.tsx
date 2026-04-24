import React, { useMemo, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { AuthScreen } from "./src/screens/AuthScreen";
import { GameScreen } from "./src/screens/GameScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { LessonScreen } from "./src/screens/LessonScreen";
import { ParentDashboardScreen } from "./src/screens/ParentDashboardScreen";
import { ProfileScreen } from "./src/screens/ProfileScreen";
import { StoryScreen } from "./src/screens/StoryScreen";
import { sampleChild, sampleProgress } from "./src/data/sampleData";
import { ChildProfile, Lesson, Progress, RouteName } from "./src/types";

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [route, setRoute] = useState<RouteName>("home");
  const [child, setChild] = useState<ChildProfile>(sampleChild);
  const [progress, setProgress] = useState<Progress>(sampleProgress);

  const navigation = useMemo(
    () => ({
      goHome: () => setRoute("home"),
      goLesson: () => setRoute("lesson"),
      goGame: () => setRoute("game"),
      goStory: () => setRoute("story"),
      goProfile: () => setRoute("profile"),
      goDashboard: () => setRoute("dashboard")
    }),
    []
  );

  const completeLesson = (lesson: Lesson) => {
    setProgress((current) => ({
      ...current,
      stars: current.stars + 3,
      coins: current.coins + 10,
      lessonsCompleted: current.lessonsCompleted.includes(lesson.id)
        ? current.lessonsCompleted
        : [...current.lessonsCompleted, lesson.id],
      wordsLearned: Array.from(
        new Set([...current.wordsLearned, ...lesson.words.map((word) => word.id)])
      ),
      streakDays: Math.max(1, current.streakDays)
    }));
  };

  if (!isSignedIn) {
    return (
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <AuthScreen onSignedIn={() => setIsSignedIn(true)} />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      {route === "home" && (
        <HomeScreen child={child} progress={progress} navigation={navigation} />
      )}
      {route === "lesson" && (
        <LessonScreen onComplete={completeLesson} navigation={navigation} />
      )}
      {route === "game" && (
        <GameScreen progress={progress} setProgress={setProgress} navigation={navigation} />
      )}
      {route === "story" && <StoryScreen navigation={navigation} />}
      {route === "profile" && (
        <ProfileScreen child={child} setChild={setChild} navigation={navigation} />
      )}
      {route === "dashboard" && (
        <ParentDashboardScreen child={child} progress={progress} navigation={navigation} />
      )}
    </SafeAreaProvider>
  );
}
