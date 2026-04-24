import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { KidButton } from "../components/KidButton";
import { ProgressPills } from "../components/ProgressPills";
import { Screen } from "../components/Screen";
import { PandaFace } from "../data/imageMap";
import { ChildProfile, NavigationActions, Progress } from "../types";
import { colors, shadows } from "../theme/colors";

type Props = {
  child: ChildProfile;
  progress: Progress;
  navigation: NavigationActions;
};

export function HomeScreen({ child, progress, navigation }: Props) {
  return (
    <Screen>
      <View style={styles.top}>
        <View>
          <Text style={styles.hello}>Hi, {child.name}</Text>
          <Text style={styles.subtitle}>Ready for Mandarin play?</Text>
        </View>
        <PandaFace size={90} />
      </View>

      <ProgressPills stars={progress.stars} coins={progress.coins} level={child.level} />

      <View style={styles.lessonCard}>
        <Text style={styles.lessonLabel}>Daily Lesson</Text>
        <Text style={styles.lessonTitle}>Animal Friends</Text>
        <Text style={styles.lessonCopy}>Learn 5 new words with BaoBao.</Text>
        <KidButton
          label="Play Lesson"
          color={colors.bamboo}
          onPress={navigation.goLesson}
          icon={<Ionicons name="play" size={22} color="#FFFFFF" />}
        />
      </View>

      <View style={styles.grid}>
        <KidButton label="Mini Game" color={colors.peach} onPress={navigation.goGame} />
        <KidButton label="Story" color={colors.sky} onPress={navigation.goStory} />
        <KidButton label="Profile" color={colors.lavender} onPress={navigation.goProfile} />
        <KidButton label="Parent" color={colors.honey} onPress={navigation.goDashboard} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12
  },
  hello: {
    color: colors.ink,
    fontSize: 34,
    fontWeight: "900"
  },
  subtitle: {
    color: colors.muted,
    fontSize: 16,
    fontWeight: "700"
  },
  lessonCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 20,
    gap: 8,
    ...shadows.soft
  },
  lessonLabel: {
    color: colors.bambooDark,
    fontSize: 15,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  lessonTitle: {
    color: colors.ink,
    fontSize: 30,
    fontWeight: "900"
  },
  lessonCopy: {
    color: colors.muted,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12
  }
});
