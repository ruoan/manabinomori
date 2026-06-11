import type { Mood } from '../types';

const CORRECT = [
  'すごい！ せいかい！',
  'やったね！ かんぺき！',
  'ぴかぴか！ よくできました！',
  'すばらしい！ その ちょうし！',
  'ばっちり！ かんぺき！',
  'やるね！ てんさいかも！',
];

const WRONG = [
  'おしい！ もう いちど ちゃれんじ！',
  'だいじょうぶ！ もう いちど やってみよう！',
  'がんばれ！ きみなら できるよ！',
  'もう ちょっと！ いっしょに かんがえよう！',
  'ドンマイ！ つぎは できるよ！',
];

const NEXT_PROMPT = [
  'つぎの もんだいも がんばれ！',
  'どんどん いこう！',
  'つぎも できるよ！',
  'いい ちょうし！ つぎへ！',
];

function pick(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function correctMsg(): { mood: Mood; msg: string } {
  return { mood: 'cheer', msg: pick(CORRECT) };
}

export function wrongMsg(): { mood: Mood; msg: string } {
  return { mood: 'happy', msg: pick(WRONG) };
}

export function nextMsg(): { mood: Mood; msg: string } {
  return { mood: 'happy', msg: pick(NEXT_PROMPT) };
}
