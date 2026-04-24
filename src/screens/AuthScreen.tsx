import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import { KidButton } from "../components/KidButton";
import { Screen } from "../components/Screen";
import { PandaFace } from "../data/imageMap";
import { signInParent, signUpParent } from "../services/firebase";
import { colors, shadows } from "../theme/colors";

type Props = {
  onSignedIn: () => void;
};

export function AuthScreen({ onSignedIn }: Props) {
  const [email, setEmail] = useState("parent@baobao.land");
  const [password, setPassword] = useState("baobao123");
  const [mode, setMode] = useState<"login" | "signup">("login");

  const submit = async () => {
    try {
      if (mode === "login") {
        await signInParent(email.trim(), password);
      } else {
        await signUpParent(email.trim(), password);
      }
      onSignedIn();
    } catch {
      Alert.alert("Almost there", "Check the parent email and password.");
    }
  };

  return (
    <Screen>
      <View style={styles.hero}>
        <PandaFace size={132} />
        <Text style={styles.brand}>BaoBao Land</Text>
        <Text style={styles.sub}>Mandarin adventures for little learners</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{mode === "login" ? "Parent Login" : "Parent Signup"}</Text>
        <TextInput
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholder="Parent email"
          style={styles.input}
        />
        <TextInput
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          style={styles.input}
        />
        <KidButton label={mode === "login" ? "Start Learning" : "Create Account"} onPress={submit} />
        <KidButton
          label={mode === "login" ? "Need Signup?" : "Use Login"}
          color={colors.lavender}
          onPress={() => setMode(mode === "login" ? "signup" : "login")}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: "center",
    paddingTop: 18,
    gap: 8
  },
  brand: {
    color: colors.ink,
    fontSize: 40,
    fontWeight: "900",
    textAlign: "center"
  },
  sub: {
    color: colors.muted,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center"
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 18,
    gap: 12,
    ...shadows.soft
  },
  cardTitle: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: "900"
  },
  input: {
    minHeight: 54,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.line,
    paddingHorizontal: 14,
    color: colors.ink,
    fontSize: 17,
    fontWeight: "700",
    backgroundColor: "#FFFCF2"
  }
});
