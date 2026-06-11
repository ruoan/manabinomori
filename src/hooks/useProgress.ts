import { useState, useCallback } from 'react';

const STORAGE_KEY = 'manabinomori_progress';

export interface StepProgress {
  attempts: number;
}

type UnitProgress = Record<string, StepProgress>;
type ProgressData = Record<string, UnitProgress>;

function load(): ProgressData {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch {
    return {};
  }
}

export function useProgress() {
  const [data, setData] = useState<ProgressData>(load);

  const getStep = useCallback(
    (unitKey: string, stepKey: string): StepProgress => {
      return data[unitKey]?.[stepKey] ?? { attempts: 0 };
    },
    [data],
  );

  const recordAttempt = useCallback((unitKey: string, stepKey: string) => {
    setData(prev => {
      const unitData = prev[unitKey] ?? {};
      const stepData = unitData[stepKey] ?? { attempts: 0 };
      const next: ProgressData = {
        ...prev,
        [unitKey]: {
          ...unitData,
          [stepKey]: { attempts: stepData.attempts + 1 },
        },
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { getStep, recordAttempt };
}
