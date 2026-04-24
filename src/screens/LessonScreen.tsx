import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KidButton } from "../components/KidButton";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { dailyLesson } from "../data/sampleData";
import { WordPicture } from "../data/imageMap";
import { speakMandarin, startPronunciationCheck } from "../services/audio";
import { Lesson, NavigationActions } from "../types";
import { colors, shadows } from "../theme/colors";

type Props = {
  navigation: NavigationActions;
  onComplete: (lesson: Lesson) => void;
};

export function LessonScreen({ navigation, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState("Tap sound, then try speaking.");
  const [listening, setListening] = useState(false);
  const word = dailyLesson.words[index];
  const isLast = index === dailyLesson.words.length - 1;

  const next = () => {
    if (isLast) {
      onComplete(dailyLesson);
      navigation.goGame();
      return;
    }
    setIndex(index + 1);
    setFeedback("Tap sound, then try speaking.");
  };

  const practice = async () => {
    setListening(true);
    setFeedback("Listening...");
    const result = await startPronunciationCheck(word);
    setListening(false);
    setFeedback(result.passed ? "Great job!" : result.message ?? "Try again!");
  };

  return (
    <Screen>
      <TopBar title="Lesson" onBack={navigation.goHome} />

      <View style={styles.card}>
        <Text style={styles.count}>{index + 1} of {dailyLesson.words.length}</Text>
        <WordPicture name={word.image} size={138} />
        <Text style={styles.hanzi}>{word.hanzi}</Text>
        <Text style={styles.pinyin}>{word.pinyin}</Text>
        <Text style={styles.english}>{word.english}</Text>
      </View>

      <View style={styles.actions}>
        <KidButton
          label="Hear It"
          onPress={() => speakMandarin(word.audioText)}
          icon={<Ionicons name="volume-high" size={22} color="#FFFFFF" />}
        />
        <KidButton
          label="Say It"
          color={colors.peach}
          onPress={practice}
          icon={listening ? <ActivityIndicator color="#FFFFFF" /> : <Ionicons name="mic" size={22} color="#FFFFFF" />}
        />
      </View>

      <View style={styles.feedback}>
        <Text style={styles.feedbackText}>{feedback}</Text>
      </View>

      <KidButton
        label={isLast ? "Earn Stars" : "Next Word"}
        color={isLast ? colors.honey : colors.bambooDark}
        onPress={next}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 360,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
    gap: 8,
    ...shadows.soft
  },
  count: {
    alignSelf: "flex-start",
    color: colors.muted,
    fontSize: 14,
    fontWeight: "900"
  },
  hanzi: {
    color: colors.ink,
    fontSize: 68,
    fontWeight: "900"
  },
  pinyin: {
    color: colors.bambooDark,
    fontSize: 27,
    fontWeight: "900"
  },
  english: {
    color: colors.muted,
    fontSize: 22,
    fontWeight: "800",
    textTransform: "capitalize"
  },
  actions: {
    flexDirection: "row",
    gap: 12
  },
  feedback: {
    minHeight: 58,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 14
  },
  feedbackText: {
    color: colors.ink,
    fontSize: 19,
    fontWeight: "900",
    textAlign: "center"
  }
});
