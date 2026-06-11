import type { Mood } from '../../types';
import { steps } from '../../drills/grade1/math/sakuranbo';

interface DrillScreenProps {
  unitKey: string;
  step: number;
  onBuddy: (mood: Mood, msg: string) => void;
  onRecord: () => void;
}

export function DrillScreen({ unitKey: _unitKey, step, onBuddy, onRecord }: DrillScreenProps) {
  const StepComponent = steps[step];
  if (!StepComponent) return null;
  return <StepComponent onBuddy={onBuddy} onRecord={onRecord} />;
}
