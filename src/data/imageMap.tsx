import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

type Props = {
  name: string;
  size?: number;
};

const labels: Record<string, string> = {
  cat: "Cat",
  dog: "Dog",
  bird: "Bird",
  fish: "Fish",
  panda: "Panda"
};

export function WordPicture({ name, size = 96 }: Props) {
  const color = {
    cat: "#F7B267",
    dog: "#B98962",
    bird: colors.sky,
    fish: "#56C6C6",
    panda: "#FFFFFF"
  }[name] ?? colors.honey;

  return (
    <View style={[styles.wrap, { width: size, height: size, borderRadius: size / 2, backgroundColor: color }]}>
      {name === "panda" ? <PandaFace size={size * 0.8} /> : <Text style={styles.label}>{labels[name] ?? name}</Text>}
    </View>
  );
}

export function PandaFace({ size = 92 }: { size?: number }) {
  const ear = size * 0.24;
  const eye = size * 0.18;

  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <View style={[styles.ear, { width: ear, height: ear, borderRadius: ear / 2, left: size * 0.06, top: size * 0.08 }]} />
      <View style={[styles.ear, { width: ear, height: ear, borderRadius: ear / 2, right: size * 0.06, top: size * 0.08 }]} />
      <View style={[styles.face, { width: size * 0.78, height: size * 0.72, borderRadius: size * 0.34 }]}>
        <View style={[styles.eye, { width: eye, height: eye * 1.25, borderRadius: eye / 2, left: size * 0.18 }]} />
        <View style={[styles.eye, { width: eye, height: eye * 1.25, borderRadius: eye / 2, right: size * 0.18 }]} />
        <View style={[styles.nose, { width: eye * 0.76, height: eye * 0.5, borderRadius: eye * 0.3 }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "#FFFFFF"
  },
  label: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900"
  },
  ear: {
    position: "absolute",
    backgroundColor: colors.ink
  },
  face: {
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    borderColor: colors.ink,
    alignItems: "center",
    justifyContent: "center"
  },
  eye: {
    position: "absolute",
    top: "32%",
    backgroundColor: colors.ink,
    transform: [{ rotate: "-16deg" }]
  },
  nose: {
    marginTop: "22%",
    backgroundColor: colors.ink
  }
});
