export type RouteName = "home" | "lesson" | "game" | "story" | "profile" | "dashboard";

export type NavigationActions = {
  goHome: () => void;
  goLesson: () => void;
  goGame: () => void;
  goStory: () => void;
  goProfile: () => void;
  goDashboard: () => void;
};

export type ChildLevel = "Sprout" | "Explorer" | "Story Star";

export type ChildProfile = {
  id: string;
  name: string;
  age: number;
  level: ChildLevel;
};

export type MandarinWord = {
  id: string;
  hanzi: string;
  pinyin: string;
  english: string;
  image: string;
  audioText: string;
};

export type Lesson = {
  id: string;
  title: string;
  theme: string;
  words: MandarinWord[];
};

export type StoryScene = {
  id: string;
  title: string;
  narration: string;
  word: MandarinWord;
};

export type Progress = {
  stars: number;
  coins: number;
  streakDays: number;
  lessonsCompleted: string[];
  wordsLearned: string[];
  badges: string[];
};
