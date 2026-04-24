import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { KidButton } from "../components/KidButton";
import { Screen } from "../components/Screen";
import { TopBar } from "../components/TopBar";
import { PandaFace } from "../data/imageMap";
import { saveChildProfile } from "../services/firebase";
import { ChildLevel, ChildProfile, NavigationActions } from "../types";
import { colors, shadows } from "../theme/colors";

type Props = {
  child: ChildProfile;
  setChild: React.Dispatch<React.SetStateAction<ChildProfile>>;
  navigation: NavigationActions;
};

const levels: ChildLevel[] = ["Sprout", "Explorer", "Story Star"];

export function ProfileScreen({ child, setChild, navigation }: Props) {
  const [name, setName] = useState(child.name);
  const [age, setAge] = useState(String(child.age));
  const [level, setLevel] = useState<ChildLevel>(child.level);

  const save = async () => {
    const nextChild = {
      ...child,
      name: name.trim() || child.name,
      age: Number(age) || child.age,
      level
    };
    setChild(nextChild);
    await saveChildProfile("mock_parent", nextChild);
    navigation.goHome();
  };

  return (
    <Screen>
      <TopBar title="Profile" onBack={navigation.goHome} />
      <View style={styles.card}>
        <PandaFace size={112} />
        <Text style={styles.title}>Child Profile</Text>
        <TextInput value={name} onChangeText={setName} placeholder="Name" style={styles.input} />
        <TextInput
          value={age}
          onChangeText={setAge}
          placeholder="Age"
          keyboardType="number-pad"
          style={styles.input}
        />
        <View style={styles.levels}>
          {levels.map((item) => (
            <KidButton
              key={item}
              label={item}
              color={level === item ? colors.bamboo : colors.lavender}
              onPress={() => setLevel(item)}
              style={styles.levelButton}
            />
          ))}
        </View>
      </View>
      <KidButton label="Save Profile" onPress={save} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 18,
    gap: 12,
    alignItems: "center",
    ...shadows.soft
  },
  title: {
    color: colors.ink,
    fontSize: 26,
    fontWeight: "900"
  },
  input: {
    width: "100%",
    minHeight: 54,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.line,
    paddingHorizontal: 14,
    color: colors.ink,
    fontSize: 17,
    fontWeight: "800",
    backgroundColor: "#FFFCF2"
  },
  levels: {
    width: "100%",
    gap: 10
  },
  levelButton: {
    width: "100%"
  }
});
