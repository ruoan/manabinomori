export type Screen = 'grade' | 'subject' | 'unit' | 'step' | 'drill';

export type Mood = 'happy' | 'cheer' | 'oops';

export interface AppState {
  screen: Screen;
  grade: number | null;
  subject: string | null;
  unit: string | null;
  step: number | null;
  mood: Mood;
  buddyMsg: string;
}

export interface Grade {
  n: number;
  color: string;
  soft: string;
  label?: string;
}

export interface Subject {
  key: string;
  name: string;
  furi: string;
  kanji: string;
  color: string;
  soft: string;
  shadow: string;
  gradeN?: number;
}

export interface Unit {
  key: string;
  name: string;
  furi: string;
  color: string;
  soft: string;
  stepCount: number;
  gradeN?: number;
  iconEmoji?: string;
}
