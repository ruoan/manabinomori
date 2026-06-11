import { useState } from 'react';
import type { AppState, Mood } from './types';
import { Header } from './components/Header';
import { BackgroundDecor } from './components/BackgroundDecor';
import { Buddy } from './components/Buddy';
import { Breadcrumb } from './components/Breadcrumb';
import { GradeScreen } from './components/screens/GradeScreen';
import { SubjectScreen } from './components/screens/SubjectScreen';
import { UnitScreen } from './components/screens/UnitScreen';
import { StepScreen } from './components/screens/StepScreen';
import { DrillScreen } from './components/screens/DrillScreen';
import { useProgress } from './hooks/useProgress';
import { UNITS_BY_SUBJECT } from './data/units';
import { SUBJECTS } from './data/subjects';

const INITIAL_STATE: AppState = {
  screen: 'grade',
  grade: null,
  subject: null,
  unit: null,
  step: null,
  mood: 'happy',
  buddyMsg: 'きょうも いっしょに がんばろう！',
};

export default function App() {
  const [state, setState] = useState<AppState>(INITIAL_STATE);
  const { getStep, recordAttempt } = useProgress();

  function goGrade() {
    setState({ ...INITIAL_STATE });
  }

  function pickGrade(n: number) {
    setState({
      ...INITIAL_STATE,
      screen: 'subject',
      grade: n,
      buddyMsg: 'すきな きょうかから やってみよう！',
    });
  }

  function pickSubject(key: string) {
    setState(prev => ({
      ...prev,
      screen: 'unit',
      subject: key,
      buddyMsg: 'どの たんげんに する？',
    }));
  }

  function pickUnit(key: string) {
    setState(prev => ({
      ...prev,
      screen: 'step',
      unit: key,
      buddyMsg: 'ステップを えらんでね！',
    }));
  }

  function pickStep(n: number) {
    setState(prev => ({
      ...prev,
      screen: 'drill',
      step: n,
      mood: 'happy',
      buddyMsg: 'はじめよう！ がんばれ！',
    }));
  }

  function goBack() {
    setState(prev => {
      switch (prev.screen) {
        case 'subject': return { ...INITIAL_STATE };
        case 'unit':    return { ...prev, screen: 'subject', unit: null, step: null, buddyMsg: 'きょうかを えらぼう！' };
        case 'step':    return { ...prev, screen: 'unit', step: null, buddyMsg: 'たんげんを えらぼう！' };
        case 'drill':   return { ...prev, screen: 'step', buddyMsg: 'ステップを えらんでね！' };
        default:        return prev;
      }
    });
  }

  function setBuddy(mood: Mood, msg: string) {
    setState(prev => ({ ...prev, mood, buddyMsg: msg }));
  }

  // Build breadcrumb items
  const breadcrumbItems = (() => {
    const items = [];
    if (state.grade !== null) items.push({ label: `${state.grade}年生`, onClick: goGrade });
    if (state.subject !== null) {
      const sub = SUBJECTS.find(s => s.key === state.subject);
      items.push({ label: sub?.name ?? state.subject, onClick: state.screen !== 'subject' ? () => setState(prev => ({ ...prev, screen: 'unit', unit: null, step: null })) : undefined });
    }
    if (state.unit !== null) {
      const unit = (UNITS_BY_SUBJECT[state.subject ?? ''] ?? []).find(u => u.key === state.unit);
      items.push({ label: unit?.name ?? state.unit, onClick: state.screen === 'drill' ? () => setState(prev => ({ ...prev, screen: 'step', buddyMsg: 'ステップを えらんでね！' })) : undefined });
    }
    if (state.step !== null && state.screen === 'drill') {
      items.push({ label: `ステップ${state.step}` });
    }
    return items;
  })();

  const showBreadcrumb = state.screen !== 'grade';

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #FFF7EA 0%, #FFF1DD 100%)',
      fontFamily: "'M PLUS Rounded 1c', sans-serif",
      color: '#4A3B2A',
      overflowX: 'hidden',
    }}>
      <BackgroundDecor />
      <Header />
      <main style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: 640,
        margin: '0 auto',
        padding: '26px clamp(18px, 4vw, 40px) 160px',
      }}>
        {showBreadcrumb && (
          <Breadcrumb items={breadcrumbItems} onBack={goBack} />
        )}

        {state.screen === 'grade' && (
          <GradeScreen onSelect={pickGrade} />
        )}
        {state.screen === 'subject' && state.grade !== null && (
          <SubjectScreen grade={state.grade} onSelect={pickSubject} />
        )}
        {state.screen === 'unit' && state.subject !== null && (
          <UnitScreen subject={state.subject} onSelect={pickUnit} />
        )}
        {state.screen === 'step' && state.unit !== null && (
          <StepScreen
            unitKey={state.unit}
            onSelect={pickStep}
            getStep={(stepKey) => getStep(state.unit!, stepKey)}
          />
        )}
        {state.screen === 'drill' && state.unit !== null && state.step !== null && (
          <DrillScreen
            unitKey={state.unit}
            step={state.step}
            onBuddy={setBuddy}
            onRecord={() => recordAttempt(state.unit!, `step${state.step}`)}
          />
        )}
      </main>
      <Buddy mood={state.mood} message={state.buddyMsg} />
    </div>
  );
}
