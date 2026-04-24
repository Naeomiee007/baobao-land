import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

type Props = {
  title: string;
  onBack?: () => void;
};

export function TopBar({ title, onBack }: Props) {
  return (
    <View style={styles.wrap}>
      {onBack ? (
        <Pressable accessibilityRole="button" onPress={onBack} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color={colors.ink} />
        </Pressable>
      ) : (
        <View style={styles.iconButton} />
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.iconButton} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: "900"
  }
});
