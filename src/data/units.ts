import type { Unit } from '../types';
import { meta as sakuranboMeta, stepLabels as sakuranboStepLabels } from '../drills/grade1/math/sakuranbo';

export const STEP_LABELS: Record<string, { name: string; desc: string }[]> = {
  sakuranbo: sakuranboStepLabels,
};

export const UNITS_BY_SUBJECT: Record<string, Unit[]> = {
  math: [sakuranboMeta],
};
