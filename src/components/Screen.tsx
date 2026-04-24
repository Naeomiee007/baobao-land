import React, { ReactNode } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme/colors";

type Props = {
  children: ReactNode;
  scroll?: boolean;
};

export function Screen({ children, scroll = true }: Props) {
  const content = <View style={styles.inner}>{children}</View>;

  return (
    <LinearGradient colors={[colors.bg, colors.bgDeep]} style={styles.fill}>
      <SafeAreaView style={styles.fill}>
        {scroll ? (
          <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
            {content}
          </ScrollView>
        ) : (
          content
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1
  },
  scroll: {
    flexGrow: 1
  },
  inner: {
    flex: 1,
    padding: 20,
    gap: 16
  }
});
