import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

type Props = {
  stars: number;
  coins: number;
  level: string;
};

export function ProgressPills({ stars, coins, level }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.pill}>
        <Ionicons name="star" size={18} color={colors.honey} />
        <Text style={styles.text}>{stars}</Text>
      </View>
      <View style={styles.pill}>
        <Ionicons name="ellipse" size={18} color={colors.peach} />
        <Text style={styles.text}>{coins}</Text>
      </View>
      <View style={styles.pillWide}>
        <Text style={styles.level}>{level}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap"
  },
  pill: {
    minWidth: 76,
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6
  },
  pillWide: {
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: "900"
  },
  level: {
    color: colors.bambooDark,
    fontSize: 15,
    fontWeight: "900"
  }
});
