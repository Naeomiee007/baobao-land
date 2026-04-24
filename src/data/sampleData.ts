import { ChildProfile, Lesson, Progress, StoryScene } from "../types";

export const sampleChild: ChildProfile = {
  id: "child_baobao_001",
  name: "Mei",
  age: 5,
  level: "Sprout"
};

export const dailyLesson: Lesson = {
  id: "lesson_animals_001",
  title: "Animal Friends",
  theme: "First animal words",
  words: [
    {
      id: "mao",
      hanzi: "猫",
      pinyin: "māo",
      english: "cat",
      image: "cat",
      audioText: "猫"
    },
    {
      id: "gou",
      hanzi: "狗",
      pinyin: "gǒu",
      english: "dog",
      image: "dog",
      audioText: "狗"
    },
    {
      id: "niao",
      hanzi: "鸟",
      pinyin: "niǎo",
      english: "bird",
      image: "bird",
      audioText: "鸟"
    },
    {
      id: "yu",
      hanzi: "鱼",
      pinyin: "yú",
      english: "fish",
      image: "fish",
      audioText: "鱼"
    },
    {
      id: "xiongmao",
      hanzi: "熊猫",
      pinyin: "xióng māo",
      english: "panda",
      image: "panda",
      audioText: "熊猫"
    }
  ]
};

export const storyScenes: StoryScene[] = dailyLesson.words.map((word, index) => ({
  id: `story_scene_${word.id}`,
  title: ["Morning Hello", "A Happy Walk", "Sky Song", "Pond Time", "BaoBao Waves"][index],
  narration: [
    "BaoBao hears a soft māo beside the bamboo house.",
    "A friendly gǒu runs over and wags hello.",
    "Up above, a niǎo sings a bright morning song.",
    "At the pond, a little yú makes tiny circles.",
    "BaoBao says xióng māo and gives everyone a bow."
  ][index],
  word
}));

export const sampleProgress: Progress = {
  stars: 6,
  coins: 25,
  streakDays: 2,
  lessonsCompleted: [],
  wordsLearned: ["mao", "gou"],
  badges: ["First Hello"]
};
