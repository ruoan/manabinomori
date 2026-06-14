import type { Mood } from '../../types';
import { STEPS_REGISTRY } from '../../data/units';

interface DrillScreenProps {
  unitKey: string;
  step: number;
  onBuddy: (mood: Mood, msg: string) => void;
  onRecord: () => void;
}

export function DrillScreen({ unitKey, step, onBuddy, onRecord }: DrillScreenProps) {
  const stepsForUnit = STEPS_REGISTRY[unitKey] ?? {};
  const StepComponent = stepsForUnit[step];
  if (!StepComponent) return null;
  return <StepComponent onBuddy={onBuddy} onRecord={onRecord} />;
}
