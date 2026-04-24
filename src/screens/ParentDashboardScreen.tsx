import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { KidButton } from "../components/KidButton";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { ChildProfile, NavigationActions, Progress } from "../types";
import { colors, shadows } from "../theme/colors";

type Props = {
  child: ChildProfile;
  progress: Progress;
  navigation: NavigationActions;
};

export function ParentDashboardScreen({ child, progress, navigation }: Props) {
  const stats = [
    { label: "Lessons", value: progress.lessonsCompleted.length },
    { label: "Words", value: progress.wordsLearned.length },
    { label: "Streak", value: `${progress.streakDays} days` },
    { label: "Badges", value: progress.badges.length }
  ];

  return (
    <Screen>
      <TopBar title="Parent" onBack={navigation.goHome} />
      <View style={styles.header}>
        <Text style={styles.title}>{child.name}'s progress</Text>
        <Text style={styles.copy}>A quick parent view for learning activity.</Text>
      </View>
      <View style={styles.grid}>
        {stats.map((stat) => (
          <View key={stat.label} style={styles.stat}>
            <Text style={styles.value}>{stat.value}</Text>
            <Text style={styles.label}>{stat.label}</Text>
          </View>
        ))}
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Rewards</Text>
        <Text style={styles.copy}>
          {progress.badges.length ? progress.badges.join(", ") : "Complete a lesson to unlock the first badge."}
        </Text>
      </View>
      <KidButton label="Back Home" onPress={navigation.goHome} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 6
  },
  title: {
    color: colors.ink,
    fontSize: 30,
    fontWeight: "900"
  },
  copy: {
    color: colors.muted,
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 23
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12
  },
  stat: {
    width: "47%",
    minHeight: 112,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    ...shadows.soft
  },
  value: {
    color: colors.bambooDark,
    fontSize: 28,
    fontWeight: "900"
  },
  label: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: "900"
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 18,
    gap: 8,
    ...shadows.soft
  },
  cardTitle: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: "900"
  }
});
