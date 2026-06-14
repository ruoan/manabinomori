import type { ComponentType } from 'react';
import type { Unit, Mood } from '../types';
import { meta as sakuranboMeta, stepLabels as sakuranboStepLabels, steps as sakuranboSteps } from '../drills/grade1/math/sakuranbo';
import { meta as yasaicountMeta, stepLabels as yasaicountStepLabels, steps as yasaicountSteps } from '../drills/yoji/math/yasaicount';

type StepProps = {
  onBuddy: (mood: Mood, msg: string) => void;
  onRecord: () => void;
};

export const STEP_LABELS: Record<string, { name: string; desc: string }[]> = {
  sakuranbo: sakuranboStepLabels,
  yasaicount: yasaicountStepLabels,
};

export const STEPS_REGISTRY: Record<string, Record<number, ComponentType<StepProps>>> = {
  sakuranbo: sakuranboSteps,
  yasaicount: yasaicountSteps,
};

export const UNITS_BY_SUBJECT: Record<string, Unit[]> = {
  math:      [sakuranboMeta],
  kazuasobi: [yasaicountMeta],
};
