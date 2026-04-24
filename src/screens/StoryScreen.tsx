import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KidButton } from "../components/KidButton";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { WordPicture } from "../data/imageMap";
import { storyScenes } from "../data/sampleData";
import { speakMandarin } from "../services/audio";
import { NavigationActions } from "../types";
import { colors, shadows } from "../theme/colors";

type Props = {
  navigation: NavigationActions;
};

export function StoryScreen({ navigation }: Props) {
  const [index, setIndex] = useState(0);
  const scene = storyScenes[index];
  const isLast = index === storyScenes.length - 1;

  return (
    <Screen>
      <TopBar title="Story" onBack={navigation.goHome} />

      <View style={styles.scene}>
        <Text style={styles.title}>{scene.title}</Text>
        <WordPicture name={scene.word.image} size={160} />
        <Text style={styles.narration}>{scene.narration}</Text>
        <View style={styles.wordRow}>
          <Text style={styles.hanzi}>{scene.word.hanzi}</Text>
          <Text style={styles.pinyin}>{scene.word.pinyin}</Text>
        </View>
      </View>

      <KidButton
        label="Narrate"
        color={colors.peach}
        onPress={() => speakMandarin(scene.word.audioText)}
        icon={<Ionicons name="volume-high" size={22} color="#FFFFFF" />}
      />
      <KidButton
        label={isLast ? "Back Home" : "Next Scene"}
        onPress={isLast ? navigation.goHome : () => setIndex(index + 1)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  scene: {
    minHeight: 430,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    padding: 20,
    ...shadows.soft
  },
  title: {
    color: colors.ink,
    fontSize: 27,
    fontWeight: "900",
    textAlign: "center"
  },
  narration: {
    color: colors.muted,
    fontSize: 19,
    fontWeight: "800",
    lineHeight: 27,
    textAlign: "center"
  },
  wordRow: {
    alignItems: "center"
  },
  hanzi: {
    color: colors.ink,
    fontSize: 44,
    fontWeight: "900"
  },
  pinyin: {
    color: colors.bambooDark,
    fontSize: 22,
    fontWeight: "900"
  }
});
