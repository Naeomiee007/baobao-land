import React, { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { KidButton } from "../components/KidButton";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { dailyLesson } from "../data/sampleData";
import { WordPicture } from "../data/imageMap";
import { NavigationActions, Progress } from "../types";
import { colors, shadows } from "../theme/colors";

type Props = {
  navigation: NavigationActions;
  progress: Progress;
  setProgress: React.Dispatch<React.SetStateAction<Progress>>;
};

export function GameScreen({ navigation, setProgress }: Props) {
  const [round, setRound] = useState(0);
  const [feedback, setFeedback] = useState("Pick the matching picture.");
  const target = dailyLesson.words[round % dailyLesson.words.length];
  const options = useMemo(() => {
    const others = dailyLesson.words.filter((word) => word.id !== target.id).slice(0, 2);
    return [target, ...others].sort((a, b) => a.english.localeCompare(b.english));
  }, [target]);

  const choose = (id: string) => {
    if (id === target.id) {
      setFeedback("Great job!");
      setProgress((progress) => ({
        ...progress,
        stars: progress.stars + 1,
        coins: progress.coins + 2
      }));
      setTimeout(() => {
        setRound((value) => value + 1);
        setFeedback("Pick the matching picture.");
      }, 650);
      return;
    }
    setFeedback("Try again!");
  };

  return (
    <Screen>
      <TopBar title="Mini Game" onBack={navigation.goHome} />

      <View style={styles.promptCard}>
        <Text style={styles.small}>Match this word</Text>
        <Text style={styles.hanzi}>{target.hanzi}</Text>
        <Text style={styles.pinyin}>{target.pinyin}</Text>
      </View>

      <View style={styles.options}>
        {options.map((option) => (
          <View key={option.id} style={styles.option}>
            <WordPicture name={option.image} size={92} />
            <KidButton label={option.english} color={colors.sky} onPress={() => choose(option.id)} />
          </View>
        ))}
      </View>

      <View style={styles.feedback}>
        <Text style={styles.feedbackText}>{feedback}</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  promptCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    alignItems: "center",
    padding: 20,
    ...shadows.soft
  },
  small: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: "900"
  },
  hanzi: {
    color: colors.ink,
    fontSize: 68,
    fontWeight: "900"
  },
  pinyin: {
    color: colors.bambooDark,
    fontSize: 24,
    fontWeight: "900"
  },
  options: {
    gap: 12
  },
  option: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    ...shadows.soft
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
    fontSize: 20,
    fontWeight: "900"
  }
});
