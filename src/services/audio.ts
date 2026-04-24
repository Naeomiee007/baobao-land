import Constants from "expo-constants";
import { Audio } from "expo-av";
import * as Speech from "expo-speech";
import { MandarinWord } from "../types";

const extra = Constants.expoConfig?.extra ?? {};

export async function speakMandarin(text: string) {
  const endpoint = extra.googleTtsEndpoint;

  if (!endpoint) {
    Speech.speak(text, { language: "zh-CN", rate: 0.82, pitch: 1.08 });
    return;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text,
      languageCode: "cmn-CN",
      voiceName: "cmn-CN-Wavenet-A"
    })
  });

  const payload = await response.json();
  if (!payload.audioContent) return;

  const sound = new Audio.Sound();
  await sound.loadAsync({ uri: `data:audio/mp3;base64,${payload.audioContent}` });
  await sound.playAsync();
}

export async function startPronunciationCheck(word: MandarinWord) {
  const endpoint = extra.googleSttEndpoint;

  if (!endpoint) {
    return {
      passed: Math.random() > 0.34,
      transcript: word.hanzi
    };
  }

  const permission = await Audio.requestPermissionsAsync();
  if (!permission.granted) {
    return {
      passed: false,
      transcript: "",
      message: "Microphone permission is needed."
    };
  }

  await Audio.setAudioModeAsync({
    allowsRecordingIOS: true,
    playsInSilentModeIOS: true
  });

  const recording = new Audio.Recording();
  await recording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
  await recording.startAsync();

  await new Promise((resolve) => setTimeout(resolve, 1900));
  await recording.stopAndUnloadAsync();

  const uri = recording.getURI();
  if (!uri) {
    return { passed: false, transcript: "" };
  }

  const form = new FormData();
  form.append("audio", {
    uri,
    name: "pronunciation.m4a",
    type: "audio/m4a"
  } as unknown as Blob);
  form.append("languageCode", "cmn-CN");
  form.append("targetText", word.hanzi);

  const response = await fetch(endpoint, {
    method: "POST",
    body: form
  });

  const payload = await response.json();
  const transcript = String(payload.transcript ?? "");

  return {
    passed: transcript.includes(word.hanzi) || transcript.toLowerCase().includes(word.pinyin[0]),
    transcript
  };
}
