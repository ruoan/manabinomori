import type { ComponentType } from 'react';
import type { Unit, Mood } from '../../../../types';
import { Step1 } from './Step1';

export type StepProps = {
  onBuddy: (mood: Mood, msg: string) => void;
  onRecord: () => void;
};

export const meta: Unit = {
  key: 'hikizan',
  name: 'ひきざん',
  furi: 'ひきざん',
  color: '#5AC8FA',
  soft: '#E3F6FF',
  stepCount: 1,
};

export const stepLabels: { name: string; desc: string }[] = [
  { name: 'ひきざん ドリル', desc: '1けたの ひきざんに ちょうせん！' },
];

export const steps: Record<number, ComponentType<StepProps>> = {
  1: Step1,
};
