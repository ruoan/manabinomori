import type { ComponentType } from 'react';
import type { Unit, Mood } from '../../../../types';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';

export type StepProps = {
  onBuddy: (mood: Mood, msg: string) => void;
  onRecord: () => void;
};

export const meta: Unit = {
  key: 'yasaicount',
  name: 'やさいの かずかぞえ',
  furi: 'やさいのかずかぞえ',
  color: '#34C77B',
  soft: '#DFF6EC',
  stepCount: 3,
  gradeN: 0,
  iconEmoji: '🥕',
};

export const stepLabels: { name: string; desc: string }[] = [
  { name: '1〜5の かずかぞえ',  desc: 'やさいを 1から 5まで かぞえよう' },
  { name: '1〜10の かずかぞえ', desc: 'やさいを 1から 10まで かぞえよう' },
  { name: 'まぜこぜ やさい',    desc: 'おなじ やさいは いくつあるかな？' },
];

export const steps: Record<number, ComponentType<StepProps>> = {
  1: Step1,
  2: Step2,
  3: Step3,
};
