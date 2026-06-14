import { useCallback, useEffect } from 'react';

export function useSpeech() {
  const speak = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'ja-JP';
    utt.rate = 0.85;
    utt.pitch = 1.1;
    window.speechSynthesis.speak(utt);
  }, []);

  const cancel = useCallback(() => {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }, []);

  useEffect(() => () => cancel(), [cancel]);

  return { speak, cancel };
}
