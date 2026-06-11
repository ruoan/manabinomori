import type { Mood } from '../../../types';
import { Step3Screen } from './Step3Screen';

interface Step4ScreenProps {
  onBuddy: (mood: Mood, msg: string) => void;
  onRecord: () => void;
}

export function Step4Screen({ onBuddy, onRecord }: Step4ScreenProps) {
  return <Step3Screen onBuddy={onBuddy} onRecord={onRecord} showHint={true} />;
}
