import type { ComponentType } from 'react';
import type { Unit, Mood } from '../../../../types';
import { Step1 } from './Step1';
import { Step2 } from './Step2';
import { Step3 } from './Step3';
import { Step5 } from './Step5';

export type StepProps = {
  onBuddy: (mood: Mood, msg: string) => void;
  onRecord: () => void;
};

export const meta: Unit = {
  key: 'sakuranbo',
  name: 'さくらんぼ算',
  furi: 'さくらんぼざん',
  color: '#FF6F91',
  soft: '#FFE6ED',
  stepCount: 5,
};

export const stepLabels: { name: string; desc: string }[] = [
  { name: '10の ごうせい',            desc: '10に なる くみあわせを おぼえよう' },
  { name: 'かずを わけよう',           desc: 'かずを ふたつに わけてみよう' },
  { name: 'さくらんぼ算（かんたん）',  desc: 'かたほうが わかれば できるかな？' },
  { name: 'さくらんぼ算（ぜんぶ）',    desc: 'あなを ぜんぶ うめよう' },
  { name: 'しあげ ドリル',             desc: 'こたえだけ こたえよう！' },
];

export const steps: Record<number, ComponentType<StepProps>> = {
  1: Step1,
  2: Step2,
  3: (props: StepProps) => <Step3 {...props} partialFill={true} />,
  4: (props: StepProps) => <Step3 {...props} partialFill={false} />,
  5: Step5,
};
