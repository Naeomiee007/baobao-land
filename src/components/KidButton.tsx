import React, { ReactNode, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { colors, shadows } from "../theme/colors";

type Props = {
  label: string;
  onPress: () => void;
  color?: string;
  icon?: ReactNode;
  style?: ViewStyle;
};

export function KidButton({ label, onPress, color = colors.bamboo, icon, style }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const animate = (toValue: number) => {
    Animated.spring(scale, {
      toValue,
      useNativeDriver: true,
      speed: 35,
      bounciness: 8
    }).start();
  };

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        onPressIn={() => animate(0.96)}
        onPressOut={() => animate(1)}
        style={[styles.button, { backgroundColor: color }]}
      >
        {icon}
        <Text style={styles.label}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 58,
    borderRadius: 8,
    paddingHorizontal: 22,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    borderBottomWidth: 5,
    borderBottomColor: "rgba(0,0,0,0.16)",
    ...shadows.soft
  },
  label: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900"
  }
});
