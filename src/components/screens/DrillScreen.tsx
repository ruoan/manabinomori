import type { Mood } from '../../types';
import { Step1Screen } from './drill/Step1Screen';
import { Step3Screen } from './drill/Step3Screen';
import { Step5Screen } from './drill/Step5Screen';

interface DrillScreenProps {
  unitKey: string;
  step: number;
  onBuddy: (mood: Mood, msg: string) => void;
  onRecord: () => void;
}

export function DrillScreen({ unitKey: _unitKey, step, onBuddy, onRecord }: DrillScreenProps) {
  const props = { onBuddy, onRecord };

  switch (step) {
    case 1: return <Step1Screen {...props} />;
    case 2: return <Step3Screen {...props} partialFill={true} />;
    case 3: return <Step3Screen {...props} partialFill={false} />;
    case 4: return <Step3Screen {...props} partialFill={false} showHint={true} />;
    case 5: return <Step5Screen {...props} />;
    default: return null;
  }
}
